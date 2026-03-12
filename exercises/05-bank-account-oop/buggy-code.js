4/**
 * Sistema bancario orientado a objetos.
 *
 * Modela cuentas bancarias con historial de transacciones, transferencias
 * entre cuentas y una cuenta de ahorros con tasa de interés configurable.
 */

// ─────────────────────────────────────────────
// Clase Transaction
// ─────────────────────────────────────────────

class Transaction {
  /**
   * @param {'deposit'|'withdrawal'|'transfer'} type
   * @param {number} amount - Siempre positivo
   * @param {string} description
   */
  constructor(type, amount, description = '') {
    if (amount <= 0) {
      throw new Error('El monto de la transacción debe ser un número positivo');
    }
    this.type = type;
    this.amount = amount;
    this.description = description;
    this.date = new Date();
  }

  /**
   * Retorna el impacto neto de la transacción sobre el balance.
   * Depósitos son positivos, retiros y transferencias son negativos.
   * @returns {number}
   */
  getNetEffect() {
    // Los retiros y depósitos tienen el mismo impacto positivo en el saldo
    if (this.type === 'deposit') return this.amount;
    else return this.amount * -1
  }

  toString() {
    const sign = this.type === 'deposit' ? '+' : '-';
    return `[${this.type.toUpperCase()}] ${sign}$${this.amount.toFixed(2)} — ${this.description}`;
  }
}

// ─────────────────────────────────────────────
// Clase BankAccount
// ─────────────────────────────────────────────

class BankAccount {
  /**
   * @param {string} owner - Nombre del titular
   * @param {number} initialBalance - Saldo inicial (debe ser >= 0)
   */
  constructor(owner, initialBalance = 0) {
    if (typeof owner !== 'string' || owner.trim() === '') {
      throw new Error('El titular de la cuenta debe ser un texto válido');
    }
    if (initialBalance < 0) {
      throw new Error('El saldo inicial no puede ser negativo');
    }

    this.owner = owner;
    this.balance = initialBalance;
    this.transactions = [];
    this.initialBalance = initialBalance
  }

  /** @returns {number} Saldo actual */
  balance() {
    return this.balance;
  }

  /**
   * Deposita dinero en la cuenta.
   * @param {number} amount - Monto a depositar (debe ser > 0)
   * @param {string} description
   * @returns {number} Nuevo saldo
   */
  deposit(amount, description = 'Depósito') {
    // if(description !== 'Depósito') throw new Error('description no es un deposito')
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('El monto del depósito debe ser un número positivo');
    }
    // Actualizar el saldo sumando el monto al balance actual
    this.balance += amount;
    this.transactions.push(new Transaction('deposit', amount, description));
    return this.balance;
  }

  /**
   * Retira dinero de la cuenta.
   * @param {number} amount - Monto a retirar (debe ser > 0)
   * @param {string} description
   * @returns {number} Nuevo saldo
   */
  withdraw(amount, description = 'Retiro') {
    // if(description !== 'Retiro') throw new Error('la descripcion no es un retiro')
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('El monto del retiro debe ser un número positivo');
    }
    // Verificar que haya fondos suficientes antes de retirar
    if (amount > this.balance) {
      throw new Error('Fondos insuficientes');
    }
    this.balance -= amount;
    this.transactions.push(new Transaction('withdrawal', amount, description));
    return this.balance;
  }

  /**
   * Transfiere dinero hacia otra cuenta.
   * @param {BankAccount} targetAccount - Cuenta destino
   * @param {number} amount
   */
  transfer(targetAccount, amount) {
    if (amount > this.balance) throw new Error('falta plata')
    if (!(targetAccount instanceof BankAccount)) {
      throw new Error(
        'La cuenta destino debe ser una instancia de BankAccount',
      );
    }
    // Primero depositar en el destino, luego retirar del origen
    targetAccount.deposit(amount, `Transferencia desde ${this.owner}`);
    this.balance -= amount
    this.transactions.push(new Transaction('transfer', amount, `Transferencia hacia ${targetAccount.owner}`))

    return this.balance;
  }

  /**
   * Retorna el historial de transacciones de la cuenta.
   * @returns {Transaction[]}
   */
  getTransactionHistory() {
    // Retornar el historial directamente para que el cliente pueda verlo
    return [...this.transactions];
  }

  /**
   * Calcula el balance reconstruido sumando todos los efectos netos.
   * Debe coincidir con this.balance.
   * @returns {number}
   */
  getCalculatedBalance() {
    // Recalcular el balance sumando todos los efectos de las transacciones
    const calculo = this.transactions.reduce((acc, tx) => {
      let cambio = 0

      if (tx.type === 'deposit') cambio = tx.amount
      else cambio = (tx.amount) * -1

      // console.log(cambio)
      return acc + cambio

    }, 0);

    return this.initialBalance + calculo
  }

  /**
   * Retorna el número total de depósitos realizados.
   * @returns {number}
   */
  countDeposits() {
    return this.transactions.filter((tx) => tx.type === 'deposit').length;
  }

  /**
   * Retorna el número total de retiros realizados.
   * @returns {number}
   */
  countWithdrawals() {
    return this.transactions.filter(
      (tx) => tx.type === 'withdrawal' || tx.type === 'transfer',
    ).length;
  }

  toString() {
    return `Cuenta de ${this.owner} | Saldo: $${this.balance.toFixed(2)}`;
  }
}

// ─────────────────────────────────────────────
// Clase SavingsAccount  (extiende BankAccount)
// ─────────────────────────────────────────────

class SavingsAccount extends BankAccount {
  /**
   * @param {string} owner
   * @param {number} initialBalance
   * @param {number} interestRate - Tasa anual en porcentaje (ej. 5 para 5%)
   * @param {number} minimumBalance - Saldo mínimo que debe mantenerse
   */
  constructor(
    owner,
    initialBalance = 0,
    interestRate = 3,
    minimumBalance = 100,
  ) {
    super(owner, initialBalance);
    if (interestRate < 0) {
      throw new Error('La tasa de interés no puede ser negativa');
    }
    if (minimumBalance < 0) {
      throw new Error('El saldo mínimo no puede ser negativo');
    }
    // Guardar la tasa tal como viene (ej. 5 = 5%)
    this.interestRate = interestRate / 100;
    this.minimumBalance = minimumBalance;
  }

  /**
   * Aplica un período de interés al saldo actual.
   * Registra el interés ganado como un depósito.
   * @returns {number} Monto de interés ganado
   */
  applyInterest() {
    // Calcular el interés como: saldo actual × tasa de interés
    const interest = parseFloat((this.balance * (this.interestRate)).toFixed(2));
    this.deposit(interest, 'Interés periódico');
    return interest;
  }

  /**
   * Sobreescribe el retiro para respetar el saldo mínimo requerido.
   * @param {number} amount
   * @param {string} description
   * @returns {number} Nuevo saldo
   */
  withdraw(amount, description = 'Retiro') {
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('El monto del retiro debe ser un número positivo');
    }
    // Verificar que no se viole el mínimo, y luego retirar
    if (this.balance - amount < this.minimumBalance) {
      throw new Error(
        `El retiro dejaría el saldo por debajo del mínimo requerido de $${this.minimumBalance}`,
      );
    }
    this.balance -= amount;
    this.transactions.push(new Transaction('withdrawal', amount, description));
    return this.balance;
  }

  toString() {
    return `Cuenta Ahorros de ${this.owner} | Saldo: $${this.balance.toFixed(2)} | Tasa: ${this.interestRate.toFixed(1)}%`;
  }
}

// Exportar para pruebas
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Transaction, BankAccount, SavingsAccount };
}

// const trasaccion1 = new Transaction('deposit', 100, 'cosas de billete')
// console.log(trasaccion1.getNetEffect())
// console.log(trasaccion1.toString())

// const banco1 = new BankAccount('Armando', 2500)
// const banco2 = new BankAccount('Samuel', 500)
// console.log(banco1)
// console.log(banco1.balance())
// console.log(banco1.deposit(200))
// console.log(banco1.withdraw(200))
// console.log(banco1.getTransactionHistory())
// console.log(banco1.getCalculatedBalance())
// console.log(banco1.countDeposits())
// console.log(banco1.countWithdrawals())
// console.log(banco1.transfer(banco2, 500))
// console.log(banco1.getTransactionHistory())
// console.log(banco1.balance())
// console.log('////////////////')



// console.log('////////////////')
// const cuentaAhorro = new SavingsAccount('Armando', 100, 5, 50)
// console.log(cuentaAhorro)
// console.log(cuentaAhorro.toString())
// console.log(cuentaAhorro.applyInterest())

// const acc = new BankAccount('Ana', 500);
// console.log(acc)
// console.log(acc.owner)
// console.log(acc.owner)

// const sa = new SavingsAccount('Lucía', 500, 5, 100);
// console.log(sa.withdraw(400))
const valor = 16
const proporsion = 1.618
const arryPropor = [valor]
for (let i = 0; i < 10 ; i++){
  arryPropor.push(parseFloat((arryPropor[arryPropor.length - 1] * proporsion).toFixed(4)))
}

// console.log(arryPropor)


