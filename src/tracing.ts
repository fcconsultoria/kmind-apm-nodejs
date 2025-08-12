import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { trace, context } from '@opentelemetry/api';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { config } from './config';

let sdk: NodeSDK | null = null;

export function startTracing() {
  if (!config.tracing.enabled) return;

  const traceExporter = new OTLPTraceExporter({
    url: config.tracing.otlpEndpoint,
    headers: {
      'x-scope-orgid': config.tracing.tenantId,
    },
  });

  sdk = new NodeSDK({
    resource: resourceFromAttributes({
      [ATTR_SERVICE_NAME]: config.tracing.serviceName,
      cluster: config.tracing.clusterName,
      container: config.tracing.containerName,
    }),
    traceExporter,
    instrumentations: [getNodeAutoInstrumentations()],
  });

  sdk.start();
}

export async function stopTracing() {
  if (!sdk) return;
  await sdk.shutdown();
}

export function getTraceContext() {
  const span = trace.getSpan(context.active());
  return {
    traceId: span?.spanContext().traceId,
    spanId: span?.spanContext().spanId,
  };
}