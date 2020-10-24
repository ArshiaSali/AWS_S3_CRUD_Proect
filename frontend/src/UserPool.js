import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'poolId',
    ClientId: 'clientid'
};

export default new CognitoUserPool(poolData);
