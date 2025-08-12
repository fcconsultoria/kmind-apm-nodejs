export const config = {
  tracing: {
    enabled: process.env.OTEL_ENABLE_TRACE === 'true',
    serviceName: process.env.OTEL_SERVICE_NAME || 'nest-api',
    clusterName: process.env.OTEL_CLUSTER_NAME,
    containerName: process.env.OTEL_CONTAINER_NAME,
    otlpEndpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
    tenantId: process.env.OTEL_TENANT_ID || 'tenant-local',
  },
  logging: {
    debugHttp: process.env.DEBUG_HTTP_REQUESTS === 'true',
  }
};