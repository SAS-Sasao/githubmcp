#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ErrorCode, ListToolsRequestSchema, McpError, } from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';
// 環境変数から設定を取得
const API_URL = process.env.API_URL || 'http://localhost:4322';
const isValidLoginArgs = (args) => typeof args === 'object' &&
    args !== null &&
    typeof args.userId === 'string' &&
    typeof args.password === 'string';
class LoginTestServer {
    constructor() {
        this.server = new Server({
            name: 'login-test-server',
            version: '0.1.0',
        }, {
            capabilities: {
                tools: {},
            },
        });
        this.axiosInstance = axios.create({
            baseURL: API_URL,
        });
        this.setupToolHandlers();
        // エラーハンドリング
        this.server.onerror = (error) => console.error('[MCP Error]', error);
        process.on('SIGINT', async () => {
            await this.server.close();
            process.exit(0);
        });
    }
    setupToolHandlers() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: [
                {
                    name: 'login_test',
                    description: 'ログイン機能のテストを実行します',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            userId: {
                                type: 'string',
                                description: 'ログイン用ユーザーID',
                            },
                            password: {
                                type: 'string',
                                description: 'ログイン用パスワード',
                            },
                        },
                        required: ['userId', 'password'],
                    },
                },
            ],
        }));
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            if (request.params.name !== 'login_test') {
                throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
            }
            if (!isValidLoginArgs(request.params.arguments)) {
                throw new McpError(ErrorCode.InvalidParams, 'Invalid login arguments');
            }
            const { userId, password } = request.params.arguments;
            try {
                console.error(`ログインを試行します: ユーザーID=${userId}`);
                const response = await this.axiosInstance.post('/api/login', {
                    userId,
                    password,
                });
                const result = response.data;
                if (result.success) {
                    return {
                        content: [
                            {
                                type: 'text',
                                text: JSON.stringify({
                                    success: true,
                                    message: 'ログインに成功しました',
                                    user: result.user,
                                }, null, 2),
                            },
                        ],
                    };
                }
                else {
                    return {
                        content: [
                            {
                                type: 'text',
                                text: JSON.stringify({
                                    success: false,
                                    message: result.error || 'ログインに失敗しました',
                                }, null, 2),
                            },
                        ],
                    };
                }
            }
            catch (error) {
                console.error('ログインエラー:', error);
                if (axios.isAxiosError(error)) {
                    const errorMessage = error.response?.data?.error || error.message;
                    return {
                        content: [
                            {
                                type: 'text',
                                text: JSON.stringify({
                                    success: false,
                                    message: `ログインエラー: ${errorMessage}`,
                                    error: error.response?.data || error.message,
                                }, null, 2),
                            },
                        ],
                        isError: true,
                    };
                }
                throw error;
            }
        });
    }
    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('Login Test MCP server running on stdio');
    }
}
const server = new LoginTestServer();
server.run().catch(console.error);
