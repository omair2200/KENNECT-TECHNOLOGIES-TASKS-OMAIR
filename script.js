function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function getPrimesInRange(start, end) {
  const primes = [];

  for (let i = start; i <= end; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }

  return primes;
}

function calculateTimeTakenForAllInstances(start, end) {
  const startTime = performance.now();
  getPrimesInRange(start, end);
  const endTime = performance.now();
  return endTime - startTime;
}

function calculateAverageTimeForPrimalityChecks(start, end) {
  const primes = getPrimesInRange(start, end);
  let totalTime = 0;

  for (const prime of primes) {
    const startTime = performance.now();
    isPrime(prime);
    const endTime = performance.now();
    totalTime += endTime - startTime;
  }

  return totalTime /2;
}

function showTimeMetrics() {
  const startRange = parseInt($('#startRange').val());
  const endRange = parseInt($('#endRange').val());

  const timeTaken = calculateTimeTakenForAllInstances(startRange, endRange);
  const averageTime = calculateAverageTimeForPrimalityChecks(startRange, endRange);

  const resultHtml = `
    <p>Time taken to run all instances: <span>${timeTaken.toFixed(2)} ms</span></p>
    <p>Average time for primality checks: <span>${averageTime.toFixed(2)} ms</span></p>
  `;

  $('#resultContainer').html(resultHtml);
}

function showTableDetails() {
  const startRange = parseInt($('#startRange').val());
  const endRange = parseInt($('#endRange').val());

  const table = $('<table class="result-table">').append('<tr><th>Number</th><th>Result</th><th>Time Taken (ms)</th></tr>');
  for (let i = startRange; i <= endRange; i++) {
    const startTime = performance.now();
    const isPrimeResult = isPrime(i) ? 'Prime' : 'Normal';
    const endTime = performance.now();
    const timeTaken = endTime - startTime;

    table.append(`<tr><td>${i}</td><td>${isPrimeResult}</td><td>${timeTaken.toFixed(2)}</td></tr>`);
  }

  $('#resultContainer').append(table);
  showPrimeTable(startRange, endRange);
}

function showPrimeTable(start, end) {
  const primes = getPrimesInRange(start, end);

  const primeTable = $('<table>').addClass('result-table').append('<tr><th>Prime Number</th><th>Time Taken (ms)</th></tr>');
  for (const prime of primes) {
    const startTime = performance.now();
    const isPrimeResult = isPrime(prime) ? 'Prime' : 'Normal';
    const endTime = performance.now();
    const timeTaken = endTime - startTime;

    primeTable.append(`<tr><td>${prime}</td><td>${timeTaken.toFixed(2)}</td></tr>`);
  }

  $('#resultContainer').append(primeTable);
  addTableStyles();
}
