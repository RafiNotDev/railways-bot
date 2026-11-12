import { Client } from 'ssh2'
import { exec } from "child_process"

let handler = async ( m, { conn, text, usedPrefix, command, args }) => {
switch (command) {
case "installpanel":
case "instalpanel":{
    if (!text) return m.reply(`[❗] *Perintah Salah*\n*${usedPrefix + command}* ipvps|pwvps|namadb|panel.com|node.com|ramserver\n*Contoh:* ${usedPrefix + command} 123.165.765.38|admin|rafi ganteng|panel-rafiganteng.co.id|node.panel-rafiganteng.co.id|32000000`);
    
    let rafi = text.split("|");
    if (rafi.length < 6) return m.reply(`[❗] *Perintah Salah*\n*${usedPrefix + command}* ipvps|pwvps|namadb|panel.com|node.com|ramserver\n*Contoh:* ${usedPrefix + command} 123.165.765.38|admin|rafi ganteng|panel-rafiganteng.co.id|node.panel-rafiganteng.co.id|32000000`);
    
    const ress = new Client()
    const connSettings = {
        host: rafi[0],
        port: '22',
        username: 'root',
        password: rafi[1]
    };
    
    const jids = m.chat
    const pass = "admin001";
    let passwordPanel = pass;
    const namadb = rafi[2]
    const domainpanel = rafi[3];
    const domainnode = rafi[4];
    const ramserver = rafi[5];
    const deletemysql = `\n`;
    const commandPanel = `bash <(curl -s https://pterodactyl-installer.se)`;
    
    async function instalWings() {
    ress.exec(commandPanel, async (err, stream) => {
        if (err) {
            console.error('Wings installation error:', err);
            m.reply(`Gagal memulai instalasi Wings: ${err.message}`);
            return ress.end();
        }
        
        stream.on('close', async (code, signal) => {
            await InstallNodes()            
        }).on('data', async (data) => {
            const dataStr = data.toString();
            console.log('Wings Install: ' + dataStr);
            
            if (dataStr.includes('Input 0-6')) {
                stream.write('1\n');
            }
            else if (dataStr.includes('(y/N)')) {
                stream.write('y\n');
            }
            else if (dataStr.includes('Enter the panel address (blank for any address)')) {
                stream.write(`${domainpanel}\n`);
            }
            else if (dataStr.includes('Database host username (pterodactyluser)')) {
                stream.write(`${namadb}\n`);
            }
            else if (dataStr.includes('Database host password')) {
                stream.write(`${namadb}\n`);
            }
            else if (dataStr.includes('Set the FQDN to use for Let\'s Encrypt (node.example.com)')) {
                stream.write(`${domainnode}\n`);
            }
            else if (dataStr.includes('Enter email address for Let\'s Encrypt')) {
                stream.write(`${namadb}@gmail.com\n`);
            }
        }).stderr.on('data', async (data) => {
            console.error('Wings Install Error: ' + data);
            m.reply(`Error pada instalasi Wings:\n${data}`);
        });
    });
}

    async function InstallNodes() {
        ress.exec('bash <(curl -s https://raw.githubusercontent.com/SkyzoOffc/Pterodactyl-Theme-Autoinstaller/main/createnode.sh)', async (err, stream) => {
            if (err) throw err;
            
            stream.on('close', async (code, signal) => {
                let teks = `
*Install Panel Telah Berhasil ✅*

*Berikut Detail Akun Panel Kamu 📦*

*👤 Username :* admin
*🔐 Password :* ${passwordPanel}
*🌐 ${domainpanel}*

Silahkan setting alocation & ambil token node di node yang sudah di buat oleh bot

*Cara menjalankan wings :*
*.startwings* ipvps|pwvps|tokennode
`;
                await conn.sendMessage(jids, {text: teks}, {quoted: m})
                ress.end();
            }).on('data', async (data) => {
                await console.log(data.toString());
                if (data.toString().includes("Masukkan nama lokasi: ")) {
                    stream.write('Singapore\n');
                }
                if (data.toString().includes("Masukkan deskripsi lokasi: ")) {
                    stream.write(`Node By ${namadb}\n`);
                }
                if (data.toString().includes("Masukkan domain: ")) {
                    stream.write(`${domainnode}\n`);
                }
                if (data.toString().includes("Masukkan nama node: ")) {
                    stream.write(`${namadb}\n`);
                }
                if (data.toString().includes("Masukkan RAM (dalam MB): ")) {
                    stream.write(`${ramserver}\n`);
                }
                if (data.toString().includes("Masukkan jumlah maksimum disk space (dalam MB): ")) {
                    stream.write(`${ramserver}\n`);
                }
                if (data.toString().includes("Masukkan Locid: ")) {
                    stream.write('1\n');
                }
            }).stderr.on('data', async (data) => {
                console.log('Stderr : ' + data);
                m.reply(`Error pada instalasi Wings: ${data}`);
            });
        });
    }

    async function instalPanel() {
        ress.exec(commandPanel, (err, stream) => {
            if (err) throw err;
            
            stream.on('close', async (code, signal) => {
                await instalWings();
            }).on('data', async (data) => {
                if (data.toString().includes('Input 0-6')) {
                    stream.write('0\n');
                } 
                if (data.toString().includes('(y/N)')) {
                    stream.write('y\n');
                } 
                if (data.toString().includes('Database name (panel)')) {
                    stream.write(`${namadb}\n`);
                }
                if (data.toString().includes('Database username (pterodactyl)')) {
                    stream.write(`${namadb}\n`);
                }
                if (data.toString().includes('Password (press enter to use randomly generated password)')) {
                    stream.write(`${namadb}\n`);
                } 
                if (data.toString().includes('Select timezone [Europe/Stockholm]')) {
                    stream.write('Asia/Jakarta\n');
                } 
                if (data.toString().includes('Provide the email address that will be used to configure Let\'s Encrypt and Pterodactyl')) {
                    stream.write(`${namadb}@gmail.com\n`);
                } 
                if (data.toString().includes('Email address for the initial admin account')) {
                    stream.write('admin@gmail.com\n');
                } 
                if (data.toString().includes('Username for the initial admin account')) {
                    stream.write('admin\n');
                } 
                if (data.toString().includes('First name for the initial admin account')) {
                    stream.write('admin\n');
                } 
                if (data.toString().includes('Last name for the initial admin account')) {
                    stream.write('admin\n');
                } 
                if (data.toString().includes('Password for the initial admin account')) {
                    stream.write(`${passwordPanel}\n`);
                } 
                if (data.toString().includes('Set the FQDN of this panel (panel.example.com)')) {
                    stream.write(`${domainpanel}\n`);
                } 
                if (data.toString().includes('Do you want to automatically configure UFW (firewall)')) {
                    stream.write('y\n')
                } 
                if (data.toString().includes('Do you want to automatically configure HTTPS using Let\'s Encrypt? (y/N)')) {
                    stream.write('y\n');
                } 
                if (data.toString().includes('Select the appropriate number [1-2] then [enter] (press \'c\' to cancel)')) {
                    stream.write('1\n');
                } 
                if (data.toString().includes('I agree that this HTTPS request is performed (y/N)')) {
                    stream.write('y\n');
                }
                if (data.toString().includes('Proceed anyways (your install will be broken if you do not know what you are doing)? (y/N)')) {
                    stream.write('y\n');
                } 
                if (data.toString().includes('(yes/no)')) {
                    stream.write('y\n');
                } 
                if (data.toString().includes('Initial configuration completed. Continue with installation? (y/N)')) {
                    stream.write('y\n');
                } 
                if (data.toString().includes('Still assume SSL? (y/N)')) {
                    stream.write('y\n');
                } 
                if (data.toString().includes('Please read the Terms of Service')) {
                    stream.write('y\n');
                }
                if (data.toString().includes('(A)gree/(C)ancel:')) {
                    stream.write('A\n');
                } 
                console.log('Logger: ' + data.toString());
            }).stderr.on('data', (data) => {
                m.reply(`Error Terjadi kesalahan :\n${data}`);
                console.log('STDERR: ' + data);
            });
        });
    }

    ress.on('ready', async () => {
        await m.reply(`*Memproses install server panel 🚀*\n\n` +
                     `*IP Address:* ${rafi[0]}\n` +
                     `*Domain Panel:* ${domainpanel}\n\n` +
                     `Mohon tunggu 10-20 menit hingga proses install selesai`);
        
        ress.exec(deletemysql, async (err, stream) => {
            if (err) throw err;
            
            stream.on('close', async (code, signal) => {
                await instalPanel();
            }).on('data', async (data) => {
                await stream.write('\t');
                await stream.write('\n');
                await console.log(data.toString());
            }).stderr.on('data', async (data) => {
                m.reply(`Error Terjadi kesalahan :\n${data}`);
                console.log('Stderr : ' + data);
            });
        });
    });

    ress.on('error', (err) => {
        console.error('SSH Connection Error:', err);
        m.reply(`Gagal terhubung ke server: ${err.message}`);
    });

    ress.connect(connSettings);
}
break

case "startwings": 
case "configurewings": {
    let t = text.split('|');
    if (t.length < 3) return m.reply(`${usedPrefix + command} ipvps|pwvps|token_node`)

    let ipvps = t[0].trim();
    let passwd = t[1].trim();
    let token = t[2].trim();

    const connSettings = {
        host: ipvps,
        port: '22',
        username: 'root',
        password: passwd
    };

    const command = `${token} && systemctl start wings`;
    const ress = new Client();

    ress.on('ready', () => {
        ress.exec(command, (err, stream) => {
            if (err) throw err;

            stream.on('close', async (code, signal) => {    
                await m.reply("*Berhasil menjalankan wings ✅*\nSilahkan cek panel anda 😋");
                ress.end();
            }).on('data', async (data) => {
                await console.log(data.toString());
            }).stderr.on('data', (data) => {
                stream.write("y\n");
                stream.write("systemctl start wings\n");
                m.reply('STDERR: ' + data);
            });
        });
    }).on('error', (err) => {
        console.log('Connection Error: ' + err);
        m.reply('Kata sandi atau IP tidak valid');
    }).connect(connSettings);
}
break;
}
}

handler.tags = ['cpanel']
handler.help = handler.command = ['installpanel', 'startwings']
handler.owner = true

export default handler