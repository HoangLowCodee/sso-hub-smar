<#import "template.ftl" as layout>
<@layout.registrationLayout 
    headerTitle="Đổi mật khẩu mới" 
    headerDescription="Thiết lập mật khẩu an toàn cho tài khoản SSO của bạn"
    iconType="refresh"; 
    section>

    <#if section = "form">
        <form id="kc-passwd-update-form" action="${url.loginAction}" method="post" class="space-y-4.5" onsubmit="return validatePasswordForm()">
            
            <!-- Hidden inputs required by Keycloak -->
            <input type="text" id="username" name="username" value="${username}" autocomplete="username" readonly="readonly" style="display:none;"/>
            <input type="password" id="password" name="password" autocomplete="current-password" style="display:none;"/>

            <!-- Mật khẩu mới -->
            <div>
                <label for="password-new" class="block text-sm font-medium text-slate-700 mb-1.5">
                    Mật khẩu mới
                </label>
                <div class="relative">
                    <input
                        id="password-new"
                        name="password-new"
                        type="password"
                        autofocus
                        autocomplete="new-password"
                        placeholder="Nhập ít nhất 6 ký tự..."
                        required
                        class="block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 pr-10 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none transition"
                        oninput="checkPasswordStrength()"
                    />
                    <button
                        type="button"
                        onclick="toggleVisibility('password-new', 'eye-icon-new')"
                        class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
                        title="Ẩn / Hiện mật khẩu"
                    >
                        <svg id="eye-icon-new" class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Xác nhận mật khẩu mới -->
            <div>
                <label for="password-confirm" class="block text-sm font-medium text-slate-700 mb-1.5">
                    Xác nhận mật khẩu mới
                </label>
                <div class="relative">
                    <input
                        id="password-confirm"
                        name="password-confirm"
                        type="password"
                        autocomplete="new-password"
                        placeholder="Nhập lại mật khẩu mới..."
                        required
                        class="block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 pr-10 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none transition"
                        oninput="checkPasswordMatch()"
                    />
                    <button
                        type="button"
                        onclick="toggleVisibility('password-confirm', 'eye-icon-confirm')"
                        class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
                        title="Ẩn / Hiện mật khẩu"
                    >
                        <svg id="eye-icon-confirm" class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                </div>
                <!-- Thông báo trùng khớp -->
                <p id="match-hint" class="mt-1 text-xs hidden"></p>
            </div>

            <!-- Tiêu chuẩn mật khẩu an toàn -->
            <div class="rounded-lg bg-slate-50 border border-slate-200/80 p-3 text-xs text-slate-500 space-y-1">
                <p class="font-medium text-slate-700">Yêu cầu bảo mật:</p>
                <div class="flex items-center gap-1.5" id="rule-length">
                    <span class="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    <span>Độ dài tối thiểu từ 6 ký tự trở lên</span>
                </div>
                <div class="flex items-center gap-1.5" id="rule-match">
                    <span class="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    <span>Hai ô mật khẩu phải trùng khớp nhau</span>
                </div>
            </div>

            <!-- Tùy chọn đăng xuất các phiên khác -->
            <#if isAppInitiatedAction??>
                <div class="flex items-center pt-1">
                    <input
                        id="logout-sessions"
                        name="logout-sessions"
                        type="checkbox"
                        value="on"
                        checked
                        class="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                    />
                    <label for="logout-sessions" class="ml-2 block text-xs text-slate-600 cursor-pointer select-none">
                        Đăng xuất khỏi tất cả các thiết bị đang đăng nhập khác
                    </label>
                </div>
            </#if>

            <!-- Buttons -->
            <div class="pt-2 flex flex-col gap-2">
                <button
                    type="submit"
                    class="w-full flex justify-center items-center py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition active:scale-[0.99] cursor-pointer"
                >
                    Lưu mật khẩu mới
                </button>

                <#if isAppInitiatedAction??>
                    <button
                        type="submit"
                        name="cancel-aia"
                        value="true"
                        class="w-full flex justify-center items-center py-2 px-4 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                    >
                        Hủy và quay lại
                    </button>
                </#if>
            </div>

        </form>

        <script>
            function toggleVisibility(inputId, iconId) {
                const input = document.getElementById(inputId);
                const icon = document.getElementById(iconId);
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.innerHTML = `
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    `;
                } else {
                    input.type = 'password';
                    icon.innerHTML = `
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    `;
                }
            }

            function checkPasswordStrength() {
                const p1 = document.getElementById('password-new').value;
                const ruleLength = document.getElementById('rule-length');
                if (p1.length >= 6) {
                    ruleLength.className = 'flex items-center gap-1.5 text-emerald-600 font-medium';
                    ruleLength.querySelector('span').className = 'w-1.5 h-1.5 rounded-full bg-emerald-500';
                } else {
                    ruleLength.className = 'flex items-center gap-1.5 text-slate-500';
                    ruleLength.querySelector('span').className = 'w-1.5 h-1.5 rounded-full bg-slate-300';
                }
                checkPasswordMatch();
            }

            function checkPasswordMatch() {
                const p1 = document.getElementById('password-new').value;
                const p2 = document.getElementById('password-confirm').value;
                const hint = document.getElementById('match-hint');
                const ruleMatch = document.getElementById('rule-match');

                if (!p2) {
                    hint.classList.add('hidden');
                    ruleMatch.className = 'flex items-center gap-1.5 text-slate-500';
                    ruleMatch.querySelector('span').className = 'w-1.5 h-1.5 rounded-full bg-slate-300';
                    return;
                }

                hint.classList.remove('hidden');
                if (p1 === p2) {
                    hint.textContent = 'Mật khẩu xác nhận trùng khớp';
                    hint.className = 'mt-1 text-xs text-emerald-600 font-medium';
                    ruleMatch.className = 'flex items-center gap-1.5 text-emerald-600 font-medium';
                    ruleMatch.querySelector('span').className = 'w-1.5 h-1.5 rounded-full bg-emerald-500';
                } else {
                    hint.textContent = 'Mật khẩu xác nhận chưa khớp';
                    hint.className = 'mt-1 text-xs text-rose-600 font-medium';
                    ruleMatch.className = 'flex items-center gap-1.5 text-rose-500';
                    ruleMatch.querySelector('span').className = 'w-1.5 h-1.5 rounded-full bg-rose-400';
                }
            }

            function validatePasswordForm() {
                const p1 = document.getElementById('password-new').value;
                const p2 = document.getElementById('password-confirm').value;
                if (p1.length < 6) {
                    alert('Mật khẩu mới phải có độ dài ít nhất 6 ký tự.');
                    return false;
                }
                if (p1 !== p2) {
                    alert('Hai ô mật khẩu không trùng khớp nhau.');
                    return false;
                }
                return true;
            }
        </script>
    </#if>

</@layout.registrationLayout>

