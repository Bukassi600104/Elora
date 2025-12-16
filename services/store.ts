import { AppState, User, Estate, PassCode, AccessLog, PassCodeType, UserRole, AuthorizedPhone } from '../types';
import { MOCK_USERS, MOCK_ESTATES, GUEST_EXPIRY_MS, DOMESTIC_EXPIRY_MS } from '../constants';

// Simple in-memory store with localStorage persistence simulation
const STORAGE_KEY = 'basic_security_db_v1';

class StoreService {
  private state: AppState;

  constructor() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      this.state = JSON.parse(stored);
    } else {
      this.state = {
        currentUser: null,
        users: MOCK_USERS,
        estates: MOCK_ESTATES,
        passCodes: [],
        logs: []
      };
      this.save();
    }
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
  }

  // Auth
  login(email: string): User | null {
    const user = this.state.users.find(u => u.email === email);
    if (user) {
      this.state.currentUser = user;
      this.save();
      return user;
    }
    return null;
  }

  logout() {
    this.state.currentUser = null;
    this.save();
  }

  getCurrentUser(): User | null {
    return this.state.currentUser;
  }

  // Users
  getUsersByEstate(estateId: string): User[] {
    return this.state.users.filter(u => u.estateId === estateId);
  }

  addUser(user: User) {
    this.state.users.push(user);
    this.save();
  }

  updateUser(user: User) {
    const idx = this.state.users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      this.state.users[idx] = user;
      this.save();
    }
  }

  // Phones
  addAuthorizedPhone(residentId: string, phone: AuthorizedPhone) {
    const user = this.state.users.find(u => u.id === residentId);
    if (user && user.role === UserRole.RESIDENT) {
      if (!user.authorizedPhones) user.authorizedPhones = [];
      if (user.authorizedPhones.length < 2) {
        user.authorizedPhones.push(phone);
        this.updateUser(user);
      } else {
        throw new Error("Maximum of 2 authorized phones allowed.");
      }
    }
  }

  approvePhone(residentId: string, phoneId: string) {
    const user = this.state.users.find(u => u.id === residentId);
    if (user && user.authorizedPhones) {
      const phone = user.authorizedPhones.find(p => p.id === phoneId);
      if (phone) {
        phone.status = 'APPROVED';
        this.updateUser(user);
      }
    }
  }

  // Codes
  generateCode(residentId: string, type: PassCodeType, guestName: string): PassCode {
    const resident = this.state.users.find(u => u.id === residentId);
    if (!resident || !resident.estateId) throw new Error("Invalid resident");

    const codeStr = Math.floor(100000 + Math.random() * 900000).toString(); // Simple 6 digit
    const now = Date.now();
    const expiry = type === PassCodeType.GUEST 
      ? now + GUEST_EXPIRY_MS 
      : now + DOMESTIC_EXPIRY_MS;

    const newCode: PassCode = {
      id: `pc-${Date.now()}`,
      code: codeStr,
      residentId,
      estateId: resident.estateId,
      type,
      guestName,
      createdAt: now,
      expiresAt: expiry,
      isUsed: false
    };

    this.state.passCodes.push(newCode);
    this.save();
    return newCode;
  }

  getCodesByResident(residentId: string): PassCode[] {
    return this.state.passCodes.filter(c => c.residentId === residentId).sort((a,b) => b.createdAt - a.createdAt);
  }

  // Validation Logic
  validateCode(codeStr: string, estateId: string): { valid: boolean; message: string; passCode?: PassCode } {
    const passCode = this.state.passCodes.find(c => c.code === codeStr && c.estateId === estateId);
    const now = Date.now();

    if (!passCode) {
      return { valid: false, message: "Invalid Code" };
    }

    if (now > passCode.expiresAt) {
      return { valid: false, message: "Code Expired", passCode };
    }

    // Guest code logic: Single use
    if (passCode.type === PassCodeType.GUEST && passCode.isUsed) {
      return { valid: false, message: "Code Already Used", passCode };
    }

    // Success
    return { valid: true, message: "Access Granted", passCode };
  }

  confirmAccess(passCodeId: string, status: 'ALLOWED' | 'DENIED') {
    const passCodeIdx = this.state.passCodes.findIndex(c => c.id === passCodeId);
    if (passCodeIdx === -1) return;

    const passCode = this.state.passCodes[passCodeIdx];
    const resident = this.state.users.find(u => u.id === passCode.residentId);

    // If Allowed and Guest, mark used
    if (status === 'ALLOWED' && passCode.type === PassCodeType.GUEST) {
        this.state.passCodes[passCodeIdx].isUsed = true;
        // Expire immediately upon use (as per requirement 6)
        this.state.passCodes[passCodeIdx].expiresAt = Date.now(); 
    }

    // Log
    const log: AccessLog = {
      id: `log-${Date.now()}`,
      passCodeId: passCode.id,
      passCodeType: passCode.type,
      residentName: resident?.name || 'Unknown',
      houseNumber: resident?.houseNumber || 'N/A',
      guestName: passCode.guestName,
      timestamp: Date.now(),
      estateId: passCode.estateId,
      status
    };

    this.state.logs.push(log);
    this.save();
  }

  getLogs(estateId: string): AccessLog[] {
    return this.state.logs
      .filter(l => l.estateId === estateId)
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  // Super Admin
  getAllEstates(): Estate[] {
    return this.state.estates;
  }

  createEstate(name: string, address: string, adminName: string, adminEmail: string) {
      const newAdminId = `u-${Date.now()}`;
      const newEstateId = `est-${Date.now()}`;

      const newEstate: Estate = {
          id: newEstateId,
          name,
          address,
          adminId: newAdminId
      };

      const newAdmin: User = {
          id: newAdminId,
          name: adminName,
          email: adminEmail,
          role: UserRole.ESTATE_ADMIN,
          estateId: newEstateId
      };

      this.state.estates.push(newEstate);
      this.state.users.push(newAdmin);
      this.save();
  }
}

export const store = new StoreService();