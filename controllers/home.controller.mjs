import os from 'os'

export const info = (req, res) => {
        const status = {
        uptime: process.uptime() + " seconds",   
        memory: process.memoryUsage(),            
        cpu: os.cpus(),                            
        platform: os.platform(),                    
        arch: os.arch(),                           
        hostname: os.hostname(),                   
        totalMemory: os.totalmem(),                
        freeMemory: os.freemem(),                   
        loadAverage: os.loadavg(),                 
        networkInterfaces: os.networkInterfaces() 
    };

    console.log("Server status requested:", status);
    res.json(status);
}