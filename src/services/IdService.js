const fs = require('fs');
const path = require('path');

/**
 * IdService handles the state management for IP addresses with file persistence.
 */
class IdService {
  constructor() {
    this.storagePath = path.join(__dirname, '../../data/storage.json');
    this.ensureStorageExists();
    this.currentIp = this.loadIp();
  }

  /**
   * Ensures the data directory and storage file exist.
   */
  ensureStorageExists() {
    const dir = path.dirname(this.storagePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.storagePath)) {
      fs.writeFileSync(this.storagePath, JSON.stringify({ ip: null }, null, 2));
    }
  }

  /**
   * Loads the IP from the local JSON file.
   */
  loadIp() {
    try {
      const data = fs.readFileSync(this.storagePath, 'utf8');
      const parsed = JSON.parse(data);
      return parsed.ip || null;
    } catch (err) {
      console.error('Error loading IP from storage:', err);
      return null;
    }
  }

  /**
   * Saves the current IP to the local JSON file.
   */
  saveIp(ip) {
    try {
      const data = JSON.stringify({ ip }, null, 2);
      fs.writeFileSync(this.storagePath, data);
    } catch (err) {
      console.error('Error saving IP to storage:', err);
    }
  }

  /**
   * Updates the current IP and persists it.
   */
  setIp(newIp) {
    this.currentIp = newIp;
    this.saveIp(this.currentIp);
    return this.currentIp;
  }

  /**
   * Retrieves the current IP.
   */
  getIp() {
    return this.currentIp;
  }
}

module.exports = new IdService();
