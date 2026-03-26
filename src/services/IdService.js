const fs = require('fs');
const path = require('path');

/**
 * IdService handles the state management for IP addresses with file persistence.
 */
class IdService {
  constructor() {
    this.storagePath = path.join(__dirname, '../../data/storage.json');
    this.ensureStorageExists();
    this.ipList = this.loadIpList();
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
      fs.writeFileSync(this.storagePath, JSON.stringify({ ips: [] }, null, 2));
    }
  }

  /**
   * Loads the IP list from the local JSON file.
   */
  loadIpList() {
    try {
      const data = fs.readFileSync(this.storagePath, 'utf8');
      const parsed = JSON.parse(data);
      return Array.isArray(parsed.ips) ? parsed.ips : [];
    } catch (err) {
      console.error('Error loading IPs from storage:', err);
      return [];
    }
  }

  /**
   * Saves the IP list to the local JSON file.
   */
  saveIpList(ipList) {
    try {
      const data = JSON.stringify({ ips: ipList }, null, 2);
      fs.writeFileSync(this.storagePath, data);
    } catch (err) {
      console.error('Error saving IPs to storage:', err);
    }
  }

  /**
   * Adds or overrides an IP in the list and persists it.
   * If the IP already exists, it is moved to the end (override effect).
   */
  setIp(newIp) {
    // Remove if already exists
    this.ipList = this.ipList.filter(ip => ip !== newIp);
    // Add to end
    this.ipList.push(newIp);
    this.saveIpList(this.ipList);
    return newIp;
  }

  /**
   * Retrieves the most recently set IP (last in the list).
   */
  getIp() {
    if (this.ipList.length === 0) return null;
    return this.ipList[this.ipList.length - 1];
  }

  /**
   * Retrieves all IPs.
   */
  getAllIps() {
    return this.ipList;
  }
}

module.exports = new IdService();
