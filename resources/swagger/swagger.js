const doc = {
    "swagger": "2.0",
    "info": {
        "version": "1.0.0",
        "title": "Challenge Dock Bank - API",
        "license": {
            "name": "MIT",
            "url": "https://opensource.org/licenses/MIT"
        }
    },
    "basePath": "/",
    "tags": [
        {
            "name": "Account",
            "description": "resources for created accounts"
        },
        {
            "name": "Person",
            "description": "resource to create new person"
        }
    ],
    "schemes": [
        "http"
    ],
    "consumes": [
        "application/json"
    ],
    "produces": [
        "application/json"
    ],
    "paths": {
        "/person": {
            "post": {
                "tags": [
                    "Person"
                ],
                "summary": "Create new Person",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "person",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Person"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "New person successfully created!"
                    },
                    "422": {
                        "description": "Person validation failed: 'entity': is already being used or is required"
                    }
                }
            }
        },
        "/account/signup": {
            "post": {
                "type": "object",
                "tags": [
                    "Account"
                ],
                "summary": "Create new account in system",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "Account",
                        "required": false,
                        "schema": {
                            "$ref": "#/definitions/Account"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Account successfully created"
                    },
                    "422": {
                        "description": "Account validation failed: 'entity': is already being used"
                    }
                }
            }
        },
        "/account/deposit/{id}": {
            "put": {
                "tags": [
                    "Account"
                ],
                "summary": "Make deposit in the account",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "value",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Account - value"
                        }
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Account ID",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Deposit successful"
                    },
                    "403": {
                        "description": "It is not possible to make the deposit. Account is not active"
                    },
                    "404": {
                        "description": "It is not possible to make the deposit. Check that the account is valid"
                    }
                }
            }
        },
        "/account/balance/{id}": {
            "get": {
                "tags": [
                    "Account"
                ],
                "summary": "Returns the balance amount of an accountD",
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Account ID",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Balance US$: xx,xx"
                    },
                    "404": {
                        "description": "It is not possible to make get balance.. Check that the account is valid"
                    }
                }
            }
        },
        "/account/withdraw/{id}/": {
            "put": {
                "tags": [
                    "Account"
                ],
                "summary": "Withdraws to an account",
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Account ID",
                        "required": true
                    },
                    {
                        "in": "body",
                        "name": "value",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Account - value"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Withdraw successful"
                    },
                    "401": {
                        "description": "It is not possible to make the deposit. Invalid value"
                    },
                    "403": {
                        "description": "It is not possible to make the deposit. Account is not active / " +
                        "It is not possible to make the deposit. Withdrawal limit exceeded / " +
                        "It is not possible to make the deposit. Insufficient balance"
                    },
                    "404": {
                        "description": "It is not possible to make the deposit. Check that the account is valid"
                    }
                }
            }
        },
        "/account/block/`{id}": {
            "put": {
                "tags": [
                    "Account"
                ],
                "summary": "Block an account",
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Account ID",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Account block"
                    },
                    "403": {
                        "description": "Account already block"
                    },
                    "404": {
                        "description": "It is not possible to make the deposit. Check that the account is valid"
                    }
                }
            }
        },
        "/account/extract/{id}": {
            "get": {
                "type": "object",
                "tags": [
                    "Account"
                ],
                "summary": "Retrieve account statements",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Account ID",
                        "required": true
                    },
                    {
                        "in": "query",
                        "name": "startDate",
                        "schema": {
                            "type": "string"
                        },
                        required: false,
                        "example": 'YYYY-MM-DD'

                    },
                    {
                        "in": "query",
                        "name": "endDate",
                        "schema": {
                            "type": "string"
                        },
                        required: false,
                        "example": 'YYYY-MM-DD'

                    }
                ],
                "responses": {
                    "200": {
                        "schema": {
                            "$ref": "#/definitions/Transactions"
                        }
                    },
                    "404" : {
                        "description" : "You have no transactions for this account!"
                    }
                }
            }
        }
    },
    "definitions": {
        "Person": {
            "required": [
                "name",
                "CPF",
                "dateOfBirth"
            ],
            "properties": {
                "name": {
                    "type": "string"
                },
                "CPF": {
                    "type": "string"
                },
                "dateOfBirth": {
                    "type": "string"
                }
            },
            "example": {
                "name": "Jhoe Dow",
                "CPF": "111.000.111-00",
                "dateOfBirth": "1998-03-26"
            }
        },
        "Person - Created": {
            "example": {
                "status": "201",
                "data": "personId",
                "message": "New person successfully created!"
            }
        },
        "Account": {
            "type": "object",
            "required": [
                "personId",
                "balance",
                "limitWithdrawDaily",
                "accountType"
            ],
            "properties": {
                "personId": {
                    "type": "string"
                },
                "balance": {
                    "type": "number"
                },
                "limitWithdrawDaily": {
                    "type": "number"
                },
                "accountType": {
                    "type": "number"
                }
            },
            "example": {
                "personId": "*previous person created id*",
                "balance": "2000",
                "limitWithdrawDaily": "1000",
                "accountType": 3
            }
        },
        "Account - Create": {
            "required": [
                "personId",
                "balance",
                "limitWithdrawDaily",
                "accountType"
            ],
            "properties": {
                "personId": {
                    "type": "string"
                },
                "balance": {
                    "type": "number"
                },
                "limitWithdrawDaily": {
                    "type": "number"
                },
                "accountType": {
                    "type": "number"
                }
            }
        },
        "Account - value": {
            "required": [
                "value"
            ],
            "properties": {
                "value": {
                    "type": "number"
                }
            },
            "example": {
                "value": "1000"
            }
        },
        "Transactions": {
            "example": {
                "Type Transaction: ": "WITHDRAW",
                "Value: ": 500,
                "Account ID: ": "6005a68c6dcab20e260430e0",
                "Date: ": "Mon, 18 Jan 2021 15:24:20 GMT",
                "Balance / Amount: ": 2500
            }
        }
    }
};

module.exports = doc;