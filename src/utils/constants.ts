const constants = {
  environments: {
    PRODUCTION: 'production',
    DEVELOPMENT: 'development',
    TEST: 'test',
  },
  test: {
    TEST_USER: {
      firstName: 'test',
      lastName: 'user',
      email: 'user@image.com',
      password: 'password',
      passwordConfirm: 'password',
    },
  },

  transactionTypes: {
    DEPOSIT: 'deposit',
    WITHDRAWAL: 'withdrawal',
    BUY: 'buy',
    SELL: 'sell',
    LOAN: 'loan',
    PAYBACK: 'payback',
  },

  groupVisibilty: {
    PUBLIC: 'public',
    PRIVATE: 'private',
  },
};

export default constants;
