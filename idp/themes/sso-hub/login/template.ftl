<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false showAnotherWayIfPresent=true>
<!DOCTYPE html>
<html lang="vi" class="h-full bg-slate-50">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${msg("loginTitle",(realm.displayName!'Đăng Nhập Hệ Thống SSO'))}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      }
    </style>
</head>
<body class="h-full antialiased text-slate-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

    <!-- Container Chính -->
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
        
        <!-- Logo & Brand Header -->
        <div class="text-center">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 text-white shadow-sm mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
            </div>
            <h1 class="text-2xl font-bold tracking-tight text-slate-900">
                Đăng nhập tài khoản
            </h1>
            <p class="mt-1.5 text-sm text-slate-500">
                Tài khoản SSO dùng chung cho toàn bộ hệ sinh thái
            </p>
        </div>

    </div>

    <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-[420px]">
        <div class="bg-white py-8 px-6 shadow-sm border border-slate-200/80 sm:rounded-2xl sm:px-10">

            <!-- Error Banner -->
            <#if message?has_content>
                <div class="mb-5 rounded-lg bg-red-50 border border-red-200 p-3.5 flex items-start gap-3">
                    <svg class="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div class="text-xs font-semibold text-red-800 leading-relaxed">
                        ${kcSanitize(message.summary)?no_esc}
                    </div>
                </div>
            </#if>

            <!-- Form Content -->
            <#nested "form">

            <!-- Footer Hệ Sinh Thái -->
            <div class="mt-8 pt-6 border-t border-slate-100 text-center">
                <p class="text-xs text-slate-400 font-medium mb-2.5">
                    Hệ thống tích hợp
                </p>
                <div class="flex justify-center items-center gap-2 text-xs font-medium text-slate-600">
                    <span class="px-2.5 py-1 bg-slate-100/80 rounded-md">Trung Tâm Công Nghiệp Sáng Tạo</span>
                    <span class="text-slate-300">•</span>
                    <span class="px-2.5 py-1 bg-slate-100/80 rounded-md">Là Việt</span>
                </div>
            </div>

        </div>

        <!-- Security Note -->
        <p class="mt-6 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
            Bảo mật định danh tiêu chuẩn OpenID Connect (OIDC)
        </p>
    </div>

</body>
</html>
</#macro>
