const idService = require('../services/IdService');

/**
 * IdController handles HTTP request-response cycle for IP-related APIs.
 */
class IdController {
  /**
   * API to set a new IP address.
   * Expects JSON body { "ip": "192.168.1.1" }
   */
  async setIp(req, res) {
    const { ip } = req.body;
    
    if (!ip) {
      return res.status(400).json({ 
        success: false, 
        message: 'IP address is required in the request body.' 
      });
    }

    const updatedIp = idService.setIp(ip);
    return res.status(200).json({ 
      success: true, 
      message: 'IP address successfully configured!', 
      data: { ip: updatedIp } 
    });
  }

  /**
   * API to fetch the current IP address.
   */
  async getIp(req, res) {
    const currentIp = idService.getIp();
    
    if (!currentIp) {
      return res.status(404).json({ 
        success: false, 
        message: 'No IP address found in configuration.' 
      });
    }

    return res.status(200).json({ 
      success: true, 
      data: { ip: currentIp } 
    });
  }
}

module.exports = new IdController();
