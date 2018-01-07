/* 
 * Copyright (c) 2017, Mihail Maldzhanski
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

//Application states
const appStates = {
    //Mining States
    eStep_InitTCPConnection: 0,
    eStep_ConnectToServer: 1,
    eStep_RequestZeroes: 2,
    eStep_CalculateDICE: 3,
    eStep_RequestValidation: 4,
    eStep_SendPrototype: 5,
    eStep_SHAOfUnit: 6,

    //Trading
    eStep_CurrentOwnerTrade: 7,
    eStep_NewOwnerTrade: 8,
    eStep_CurrentReleaseOwnerlessToServer: 9,

    eStep_CurrentOwnerClaimToServer: 10,
    eStep_NewOwnerClaimToServer: 11,
    eStep_CurrentReleaseOwnerless: 12,

    //Idle
    eStep_IDLE: 13,

    eExit_FromApp: 14,
    eStep_Count: 15
};

//Data stored buffer from console arguments
const Args = {
    command: undefined,
    fileInput: undefined,
    diceUnit: undefined,
    fileOutput: undefined,
    addrOp: undefined,
    addrMin: undefined,
    specificUnitValue: undefined
};

//Command execution table
const CommandsTable =
        [
            {args: ['-c', '--calculate'], dataArgs: ['fileInput', 'fileOutput', 'addrOp', 'specificUnitValue'], exec: 'funcCalculate', help: "Calculate new DICE Unit by using CPU and JS based SHA3 Library"},
            {args: ['-v', '--validate'], dataArgs: ['fileInput'], exec: 'funcValidate', help: "Exports content from Base58 saved unit (must to add printing of Value of the Unit)"},
            {args: ['-k', '--keygen'], dataArgs: ['fileOutput'], exec: 'funcKeyGen', help: "Generate new KeyPair of Digital Address and Private Key"},
            {args: ['-to', '--tradeOwnerless'], dataArgs: ['fileInput', 'diceUnit', 'addrOp'], exec: 'funcTradeOwnerless', help: "Trade ownerless dice unit"},
            {args: ['-tc', '--tradeCurrent'], dataArgs: ['fileInput', 'diceUnit', 'fileOutput', 'addrMin', 'addrOp'], exec: 'funcTradeCurrent', help: "Trade current owner of unit "},
            {args: ['-tn', '--tradeNew'], dataArgs: ['fileInput', 'diceUnit', 'addrOp'], exec: 'funcTradeNew', help: "Trade request from new owner (for ownerless unit or traded unit)"},
            {args: ['-cc', '--calculateCuda'], dataArgs: ['fileInput', 'fileOutput', 'addrOp', 'specificUnitValue'], exec: 'funcCalculateCUDA', help: "Calculate new DICE Unit by using CUDA accelerated application"},
            {args: ['-r', '--register'], dataArgs: ['fileInput','diceUnit','addrOp'], exec: 'funcRegister', help: "Send prototype to operator to register it in its DB."},
            {args: ['-h', '--help'], dataArgs: [], exec: 'funcHelp', help: "Print Following list"}
        ];

//Path to CUDA application
const pathToCudaApp = "../CUDA/DICECalculator.exe";

//View output allowed type of codes
const viewModelCfg = {
    ERROR: true,
    WARNING: true,
    USER_INFO: true,
    DEV_INFO: false
};

//Ex: 'text' 'code' 'rpc'
const viewModelOutput = 'code';

//View Interfaces
const confAppViewIF = require('../../VIEW/VIEW_Interfaces.js');

//Exported config
module.exports.minerArgs = Args;
module.exports.minerStates = appStates;
module.exports.minerPathToCuda = pathToCudaApp;
module.exports.minerCommandTable = CommandsTable;
module.exports.minerViewCfg = viewModelCfg;
module.exports.minerViewOut = viewModelOutput;
module.exports.minerVIEW_IF = confAppViewIF;