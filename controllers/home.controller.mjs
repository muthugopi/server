import os from 'os'
import { server_datas } from './data.controller.mjs';

export const info = (req, res) => {
        server_datas.admin_visits += 1;
        const status = {
        author: "Muthugopi J",
        available_routes : "/login, /register",
        uptime: process.uptime() + " seconds",   
        memory: process.memoryUsage(),            
        cpu: os.cpus(),                            
        platform: os.platform(),                    
        arch: os.arch(),                           
        hostname: os.hostname(),                   
        totalMemory: os.totalmem(),                
        freeMemory: os.freemem(),                   
        loadAverage: os.loadavg(),                 
        networkInterfaces: os.networkInterfaces(),
        running:true
    };

    console.log("Server status requested:", status);
    res.json(status);
}