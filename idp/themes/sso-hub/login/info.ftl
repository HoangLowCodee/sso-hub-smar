<#import "template.ftl" as layout>
<@layout.registrationLayout 
    headerTitle="Thông báo hệ thống" 
    headerDescription="Hệ thống định danh và xác thực SSO Hub"
    iconType="shield"; 
    section>

    <#if section = "form">
        <div class="space-y-4 text-center">
            
            <p class="text-sm text-slate-700 leading-relaxed font-normal">
                ${kcSanitize(message.summary)?no_esc}
            </p>

            <div class="pt-4 border-t border-slate-100 flex flex-col gap-2">
                <#if actionUri??>
                    <a
                        href="${actionUri}"
                        class="w-full inline-flex justify-center items-center py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition cursor-pointer"
                    >
                        Tiếp tục →
                    </a>
                <#elseif client?? && client.baseUrl?has_content>
                    <a
                        href="${client.baseUrl}"
                        class="w-full inline-flex justify-center items-center py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition cursor-pointer"
                    >
                        ← Quay lại ứng dụng
                    </a>
                <#elseif (url.loginUrl)?has_content>
                    <a
                        href="${url.loginUrl}"
                        class="w-full inline-flex justify-center items-center py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition cursor-pointer"
                    >
                        ← Đăng nhập lại
                    </a>
                </#if>
            </div>

        </div>
    </#if>

</@layout.registrationLayout>

