#!/bin/sh
set -e

# =============================================================================
# KEYCLOAK RENDER ENTRYPOINT SCRIPT (LOW MEMORY OPTIMIZATION)
# =============================================================================

# 1. Giới hạn bộ nhớ JVM nghiêm ngặt để chạy ổn định dưới giới hạn 512MB RAM của Render Free Tier
# -Xms64m -Xmx280m: Giới hạn heap tối đa 280MB
# -XX:MaxMetaspaceSize=128m: Giới hạn metaspace 128MB
# -XX:+UseSerialGC: GC tiêu tốn ít RAM nhất cho container nhỏ
export JAVA_OPTS="-Xms64m -Xmx280m -XX:MetaspaceSize=96m -XX:MaxMetaspaceSize=128m -XX:+UseSerialGC -XX:MinHeapFreeRatio=20 -XX:MaxHeapFreeRatio=40 -XX:CICompilerCount=2"

# 2. Tự động chuyển đổi DATABASE_URL từ Render sang định dạng JDBC của Keycloak
if [ -n "$DATABASE_URL" ] && [ -z "$KC_DB_URL" ]; then
    echo ">> [Render] Phát hiện DATABASE_URL từ Render, đang chuyển đổi sang định dạng Keycloak JDBC..."
    
    DB_USERPASS=$(echo "$DATABASE_URL" | sed -e 's,^[^:]*://\([^@]*\)@.*,\1,g')
    DB_HOSTPORTDB=$(echo "$DATABASE_URL" | sed -e 's,^[^:]*://[^@]*@\(.*\),\1,g')

    if [ -z "$KC_DB_USERNAME" ]; then
        export KC_DB_USERNAME=$(echo "$DB_USERPASS" | cut -d: -f1)
    fi
    if [ -z "$KC_DB_PASSWORD" ]; then
        export KC_DB_PASSWORD=$(echo "$DB_USERPASS" | cut -d: -f2)
    fi

    export KC_DB_URL="jdbc:postgresql://${DB_HOSTPORTDB}"
    export KC_DB="postgres"
    echo ">> [Render] Đã cấu hình KC_DB_URL: ${KC_DB_URL}"
fi

# 3. Cấu hình cổng HTTP phù hợp với biến PORT của Render (mặc định 10000 trên Render)
HTTP_PORT="${PORT:-8080}"
echo ">> [Render] Keycloak khởi chạy trên cổng HTTP: ${HTTP_PORT}"

# 4. Khởi động Keycloak ở chế độ --optimized để KHÔNG build lại lúc runtime (tiết kiệm RAM & khởi động siêu nhanh)
exec /opt/keycloak/bin/kc.sh start --optimized \
    --http-port="${HTTP_PORT}" \
    --http-enabled=true \
    --proxy=edge \
    --hostname-strict=false \
    --import-realm \
    "$@"
