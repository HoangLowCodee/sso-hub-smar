<#import "template.ftl" as layout>
<@layout.registrationLayout 
    headerTitle="Khôi phục mật khẩu" 
    headerDescription="Nhập email hoặc tên tài khoản để nhận liên kết đặt lại mật khẩu"
    iconType="mail"; 
    section>

    <#if section = "form">
        <form id="kc-reset-password-form" action="${url.loginAction}" method="post" class="space-y-4">
            
            <!-- Email / Tên tài khoản -->
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
                    value="${(auth.attemptedUsername!'')}"
                    placeholder="name@example.com"
                    required
                    class="block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none transition"
                />
            </div>

            <!-- Buttons -->
            <div class="pt-2 flex flex-col gap-2.5">
                <button
                    type="submit"
                    class="w-full flex justify-center items-center py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition active:scale-[0.99] cursor-pointer"
                >
                    Gửi liên kết đặt lại mật khẩu
                </button>

                <a
                    href="${url.loginUrl}"
                    class="w-full flex justify-center items-center py-2 px-4 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                >
                    ← Quay lại đăng nhập
                </a>
            </div>

        </form>
    </#if>

</@layout.registrationLayout>

