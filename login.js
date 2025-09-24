// Firework animation for mini game
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('firework-btn');
    const canvas = document.getElementById('firework-canvas');
    if (!btn || !canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    let fireworks = [];

    function randomColor() {
        const colors = ['#ff1744','#fbc02d','#00e676','#2979ff','#d500f9','#ff9100'];
        return colors[Math.floor(Math.random()*colors.length)];
    }

    function Firework(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        for (let i = 0; i < 30; i++) {
            const angle = (Math.PI * 2) * (i / 30);
            const speed = Math.random() * 3 + 2;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                color: randomColor()
            });
        }
    }

    Firework.prototype.update = function() {
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05;
            p.alpha -= 0.02;
        });
        this.particles = this.particles.filter(p => p.alpha > 0);
    };

    Firework.prototype.draw = function(ctx) {
        this.particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI*2);
            ctx.fillStyle = p.color;
            ctx.fill();
            ctx.restore();
        });
    };

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fireworks.forEach(fw => {
            fw.update();
            fw.draw(ctx);
        });
        fireworks = fireworks.filter(fw => fw.particles.length > 0);
        if (fireworks.length > 0) requestAnimationFrame(animate);
    }

    btn.addEventListener('click', function(e) {
        const rect = canvas.getBoundingClientRect();
        const x = rect.width/2;
        const y = rect.height/2;
        fireworks.push(new Firework(x, y));
        animate();
    });
});
// JavaScript to handle login, register, forgot password, and navigation between forms

document.addEventListener('DOMContentLoaded', () => {
    // Tampilkan daftar akun tersimpan di login
    function showSavedAccounts() {
        let accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
        const loginForm = document.getElementById('loginForm');
        let selectDiv = document.getElementById('savedAccountsDiv');
        if (!selectDiv) {
            selectDiv = document.createElement('div');
            selectDiv.id = 'savedAccountsDiv';
            loginForm.insertBefore(selectDiv, loginForm.firstChild);
        }
        if (accounts.length > 0) {
            let options = accounts.map(acc => `<option value='${acc.username}'>${acc.username}</option>`).join('');
            selectDiv.innerHTML = `<label for='savedAccountSelect'>Pilih akun tersimpan:</label><select id='savedAccountSelect'><option value=''>--Pilih Akun--</option>${options}</select>`;
            document.getElementById('savedAccountSelect').onchange = function() {
                const selected = accounts.find(acc => acc.username === this.value);
                if (selected) {
                    document.getElementById('username').value = selected.username;
                    document.getElementById('password').value = selected.password;
                } else {
                    document.getElementById('username').value = '';
                    document.getElementById('password').value = '';
                }
            };
        } else {
            selectDiv.innerHTML = '';
        }
    }

    showSavedAccounts();
    const loginContainer = document.getElementById('loginContainer');
    const registerContainer = document.getElementById('registerContainer');
    const forgotPasswordContainer = document.getElementById('forgotPasswordContainer');

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');

    const message = document.getElementById('message');
    const registerMessage = document.getElementById('registerMessage');
    const forgotPasswordMessage = document.getElementById('forgotPasswordMessage');

    // Show register form
    document.getElementById('registerLink').addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
        forgotPasswordContainer.style.display = 'none';
        clearMessages();
    });

    // Show login form from register
    document.getElementById('loginLink').addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.style.display = 'block';
        registerContainer.style.display = 'none';
        forgotPasswordContainer.style.display = 'none';
        clearMessages();
    });

    // Show forgot password form
    document.getElementById('forgotPasswordLink').addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'none';
        forgotPasswordContainer.style.display = 'block';
        clearMessages();
    });

    // Back to login from forgot password
    document.getElementById('backToLoginLink').addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.style.display = 'block';
        registerContainer.style.display = 'none';
        forgotPasswordContainer.style.display = 'none';
        clearMessages();
    });

    // Clear all messages
    function clearMessages() {
        message.textContent = '';
        registerMessage.textContent = '';
        forgotPasswordMessage.textContent = '';
    }

    // Handle login form submit
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (username === 'ucup') {
            message.style.color = 'green';
            message.textContent = `Welcome back ${username}! Redirecting...`;
            setTimeout(() => {
                window.location.href = "file:///C:/Users/ASUS/Documents/CODINGAN/portofolio/index.html";
            }, 1200);
        } else {
            // Cek akun tersimpan
            let accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
            const found = accounts.find(acc => acc.username === username && acc.password === password);
            if (found) {
                message.style.color = 'green';
                message.textContent = `Welcome back ${found.username}! Redirecting...`;
                    alert('Login berhasil! Anda akan diarahkan ke halaman utama.');
                setTimeout(() => {
                    window.location.href = "file:///C:/Users/ASUS/Documents/CODINGAN/portofolio/index.html";
                }, 1200);
            } else {
                message.style.color = 'red';
                message.textContent = 'Invalid username or password.';
            }
        }
    });

    // Handle register form submit
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const regUsername = document.getElementById('regUsername').value.trim();
        const regEmail = document.getElementById('regEmail').value.trim();
        const regPassword = document.getElementById('regPassword').value.trim();

        if (regUsername && regEmail && regPassword) {
            registerMessage.style.color = 'green';
            registerMessage.innerHTML = `Registration successful!<br><br>Username: <b>${regUsername}</b><br>Email: <b>${regEmail}</b><br><br>Apakah ingin menyimpan informasi anda?<br><button id='saveAccountBtn'>Simpan informasi akun</button>`;

            // Tambahkan event listener untuk tombol simpan akun
            setTimeout(() => {
                const saveBtn = document.getElementById('saveAccountBtn');
                if (saveBtn) {
                    saveBtn.onclick = function() {
                        // Simpan akun ke localStorage
                        let accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
                        accounts.push({ username: regUsername, email: regEmail, password: regPassword });
                        localStorage.setItem('accounts', JSON.stringify(accounts));
                        registerMessage.innerHTML = 'Informasi akun berhasil disimpan! Silakan login.';
                        setTimeout(() => {
                            loginContainer.style.display = 'block';
                            registerContainer.style.display = 'none';
                            forgotPasswordContainer.style.display = 'none';
                            clearMessages();
                        }, 1500);
                    };
                }
            }, 100);
        } else {
            registerMessage.style.color = 'red';
            registerMessage.textContent = 'Please fill all fields.';
        }
    });

    // Handle forgot password form submit
    forgotPasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const forgotEmail = document.getElementById('forgotEmail').value.trim();

        if (forgotEmail) {
            forgotPasswordMessage.style.color = 'green';
            forgotPasswordMessage.textContent = 'Password reset link sent to your email.';
            // Here you can implement actual password reset logic
        } else {
            forgotPasswordMessage.style.color = 'red';
            forgotPasswordMessage.textContent = 'Please enter your email.';
        }
    });

    // Handle logout button click
    document.getElementById('logoutButton').addEventListener('click', () => {
        document.getElementById('mainPage').style.display = 'none';
        document.getElementById('loginContainer').style.display = 'block';
        clearMessages();
    });
});
