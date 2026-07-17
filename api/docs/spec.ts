const openApiSpec = {
  openapi: '3.1.0',
  info: {
    title: 'rpx-xui-webapp API (local endpoints)',
    version: '1.0.0',
    description: 'Local-only gateway endpoints. Upstream service APIs are linked separately in Swagger UI.',
  },
  servers: [
    {
      url: '/api',
      description: 'Current environment',
    },
  ],
  tags: [
    { name: 'Core', description: 'Local service endpoints' },
    { name: 'Case Share', description: 'Case share stubs and helpers' },
  ],
  paths: {
    '/healthCheck': {
      get: {
        summary: 'Health check',
        description: 'Returns aggregated health state for configured downstream services.',
        tags: ['Core'],
        responses: {
          200: {
            description: 'Health status',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HealthStatus' },
              },
            },
          },
        },
      },
    },
    '/monitoring-tools': {
      get: {
        summary: 'Monitoring configuration',
        description: 'Returns Application Insights configuration for the UI.',
        tags: ['Core'],
        responses: {
          200: {
            description: 'Monitoring keys',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/MonitoringConfig' },
              },
            },
          },
        },
      },
    },
    '/configuration': {
      get: {
        summary: 'Feature flag probe',
        description: 'Returns configuration value for a provided key.',
        tags: ['Core'],
        parameters: [
          {
            name: 'configurationKey',
            in: 'query',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'Configuration value',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ConfigurationValue' },
              },
            },
          },
        },
      },
    },
    '/user/details': {
      get: {
        summary: 'Current user details',
        description: 'Returns details and role assignments for the current authenticated user.',
        tags: ['Core'],
        security: [{ sessionCookie: [] }, { bearerAuth: [] }],
        responses: {
          200: {
            description: 'User details',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UserDetailsResponse' },
              },
            },
          },
          401: { description: 'Unauthenticated' },
        },
      },
    },
    '/caseshare/orgs': {
      get: {
        summary: 'List organisations available for case sharing',
        tags: ['Case Share'],
        security: [{ sessionCookie: [] }, { bearerAuth: [] }],
        responses: {
          200: {
            description: 'Organisations',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Organisation' },
                },
              },
            },
          },
        },
      },
    },
    '/caseshare/users': {
      get: {
        summary: 'List users for case sharing',
        tags: ['Case Share'],
        security: [{ sessionCookie: [] }, { bearerAuth: [] }],
        parameters: [
          {
            name: 'q',
            in: 'query',
            required: false,
            description: 'Optional search text for users',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'Users',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/UserDetails' },
                },
              },
            },
          },
          404: { description: 'User not found' },
        },
      },
    },
    '/caseshare/cases': {
      get: {
        summary: 'List cases available for sharing',
        tags: ['Case Share'],
        security: [{ sessionCookie: [] }, { bearerAuth: [] }],
        responses: {
          200: {
            description: 'Cases',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/SharedCase' },
                },
              },
            },
          },
          404: { description: 'Cases not found' },
        },
      },
    },
    '/caseshare/case-assignments': {
      get: {
        summary: 'Get case assignments',
        tags: ['Case Share'],
        security: [{ sessionCookie: [] }, { bearerAuth: [] }],
        responses: {
          200: {
            description: 'Assignments',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/SharedCase' },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Assign cases to users',
        tags: ['Case Share'],
        security: [{ sessionCookie: [] }, { bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  sharedCases: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/SharedCase' },
                  },
                },
                required: ['sharedCases'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Updated shared cases',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/SharedCase' },
                },
              },
            },
          },
          500: { description: 'Assignment failed' },
        },
      },
    },
  },
  components: {
    schemas: {
      HealthStatus: {
        type: 'object',
        properties: {
          healthState: { type: 'boolean' },
        },
      },
      MonitoringConfig: {
        type: 'object',
        properties: {
          key: { type: 'string', nullable: true },
          connectionString: { type: 'string', nullable: true },
        },
      },
      ConfigurationValue: {
        type: 'object',
        properties: {
          value: {
            oneOf: [
              { type: 'boolean' },
              { type: 'string' },
              { type: 'number' },
              { type: 'object' },
              { type: 'array', items: {} },
              { type: 'null' },
            ],
          },
        },
      },
      UserInfoPayload: {
        type: 'object',
        properties: {
          id: { type: 'string', nullable: true },
          uid: { type: 'string', nullable: true },
          email: { type: 'string', format: 'email', nullable: true },
          roles: { type: 'array', items: { type: 'string' } },
          roleCategory: { type: 'string', nullable: true },
          token: { type: 'string', nullable: true },
        },
      },
      UserDetailsResponse: {
        type: 'object',
        properties: {
          canShareCases: { type: 'boolean' },
          roleAssignmentInfo: { type: 'array', items: { type: 'object' } },
          sessionTimeout: { type: 'number', description: 'Seconds' },
          userInfo: { $ref: '#/components/schemas/UserInfoPayload' },
        },
      },
      UserDetails: {
        type: 'object',
        properties: {
          idamId: { type: 'string' },
          email: { type: 'string', format: 'email' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          caseRoles: {
            type: 'array',
            items: { type: 'string' },
          },
        },
        required: ['idamId', 'email', 'firstName', 'lastName'],
      },
      SharedCase: {
        type: 'object',
        properties: {
          caseId: { type: 'string' },
          caseTitle: { type: 'string' },
          caseTypeId: { type: 'string' },
          roles: { type: 'array', items: { type: 'string' } },
          sharedWith: {
            type: 'array',
            items: { $ref: '#/components/schemas/UserDetails' },
          },
          pendingShares: {
            type: 'array',
            items: { $ref: '#/components/schemas/UserDetails' },
          },
          pendingUnshares: {
            type: 'array',
            items: { $ref: '#/components/schemas/UserDetails' },
          },
        },
        required: ['caseId', 'caseTitle'],
      },
      Organisation: {
        type: 'object',
        properties: {
          orgId: { type: 'string' },
          orgName: { type: 'string' },
          users: {
            type: 'array',
            items: { $ref: '#/components/schemas/UserDetails' },
          },
        },
        required: ['orgId', 'orgName'],
      },
    },
    securitySchemes: {
      sessionCookie: {
        type: 'apiKey',
        in: 'cookie',
        name: '__auth__',
      },
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
} as const;

export default openApiSpec;
