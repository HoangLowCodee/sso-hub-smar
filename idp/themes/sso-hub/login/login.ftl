<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=true displayInfo=false; section>

    <#if section = "form">
        <form id="kc-form-login" action="${url.loginAction}" method="post" class="space-y-4">
            
            <!-- Email / Username -->
            <div>
                <label for="username" class="block text-sm font-medium text-slate-700 mb-1.5">
                    Email hoặc Tên đăng nhập
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    autofocus
                    autocomplete="username"
                    value="${(login.username!'')}"
                    placeholder="name@example.com"
                    required
                    class="block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none transition"
                />
            </div>

            <!-- Password -->
            <div>
                <div class="flex items-center justify-between mb-1.5">
                    <label for="password" class="block text-sm font-medium text-slate-700">
                        Mật khẩu
                    </label>
                    <#if realm.resetPasswordAllowed>
                        <a href="${url.loginResetCredentialsUrl}" class="text-xs font-semibold text-blue-600 hover:text-blue-500 transition">
                            Quên mật khẩu?
                        </a>
                    </#if>
                </div>
                <div class="relative">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="current-password"
                        placeholder="••••••••"
                        required
                        class="block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 pr-10 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none transition"
                    />
                    <button
                        type="button"
                        onclick="togglePassword()"
                        class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
                        tabindex="-1"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Dropdown Chọn Web Kết Nối (Không dùng icon, chuẩn tối giản) -->
            <div>
                <label for="appSelect" class="block text-sm font-medium text-slate-700 mb-1.5">
                    Nền tảng kết nối
                </label>
                <div class="relative">
                    <select
                        id="appSelect"
                        name="app_destination"
                        class="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 pr-10 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none appearance-none transition cursor-pointer"
                    >
                        <option value="cic">Trung Tâm Công Nghiệp Sáng Tạo</option>
                        <option value="laviet">Là Việt</option>
                    </select>
                    <!-- Mũi tên Dropdown SVG mảnh thanh lịch -->
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Ghi nhớ phiên đăng nhập -->
            <div class="flex items-center pt-0.5">
                <#if realm.rememberMe && !usernameHidden??>
                    <label class="flex items-center cursor-pointer select-none">
                        <input
                            id="rememberMe"
                            name="rememberMe"
                            type="checkbox"
                            class="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                        />
                        <span class="ml-2 text-xs text-slate-600 font-medium">Ghi nhớ phiên đăng nhập</span>
                    </label>
                </#if>
            </div>

            <!-- Submit Button -->
            <div class="pt-1">
                <button
                    type="submit"
                    name="login"
                    id="kc-login"
                    class="w-full inline-flex justify-center items-center rounded-lg bg-slate-900 py-2.5 px-4 text-sm font-semibold text-white shadow hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 transition active:scale-[0.99] cursor-pointer"
                >
                    Đăng nhập SSO
                </button>
            </div>

        </form>

        <script>
            function togglePassword() {
                var pwd = document.getElementById("password");
                pwd.type = pwd.type === "password" ? "text" : "password";
            }

            var currentClient = "<#if client??>${client.clientId!''}<#else>app-a</#if>";

            function initActiveApp() {
                var selectEl = document.getElementById("appSelect");
                if (currentClient.indexOf("laviet") !== -1 || currentClient === "app-b") {
                    selectEl.value = "laviet";
                } else {
                    selectEl.value = "cic";
                }
            }

            window.addEventListener('DOMContentLoaded', initActiveApp);
        </script>
    </#if>

</@layout.registrationLayout>
