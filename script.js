// Function to check if a number is prime
function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// Function to get all prime numbers in a given range
function getPrimesInRange(start, end) {
  const primes = [];

  for (let i = start; i <= end; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }

  return primes;
}

// Function to calculate time taken for all instances
function calculateTimeTakenForAllInstances(start, end) {
  const startTime = performance.now();
  getPrimesInRange(start, end);
  const endTime = performance.now();
  return endTime - startTime;
}

// Function to calculate average time for primality checks
function calculateAverageTimeForPrimalityChecks(start, end) {
  const primes = getPrimesInRange(start, end);
  let totalTime = 0;

  for (const prime of primes) {
    const startTime = performance.now();
    isPrime(prime);
    const endTime = performance.now();
    totalTime += endTime - startTime;
  }

  return totalTime / primes.length;
}

// Function to show 2.a Time taken to run all instances and 2.d Average time for primality checks
function showTimeMetrics() {
  const startRange = parseInt($('#startRange').val());
  const endRange = parseInt($('#endRange').val());

  const timeTaken = calculateTimeTakenForAllInstances(startRange, endRange);
  const averageTime = calculateAverageTimeForPrimalityChecks(startRange, endRange);

  // Display the results
  const resultHtml = `
    <p>Time taken to run all instances: <span>${timeTaken.toFixed(2)} ms</span></p>
    <p>Average time for primality checks: <span>${averageTime.toFixed(2)} ms</span></p>
  `;

  // Show the results in the resultContainer
  $('#resultContainer').html(resultHtml);
}

// Function to display table details showing numbers between the range and their primality with time taken
function showTableDetails() {
  const startRange = parseInt($('#startRange').val());
  const endRange = parseInt($('#endRange').val());

  // Create a table for all numbers in the range
  const table = $('<table class="result-table">').append('<tr><th>Number</th><th>Result</th><th>Time Taken (ms)</th></tr>');
  for (let i = startRange; i <= endRange; i++) {
    const startTime = performance.now();
    const isPrimeResult = isPrime(i) ? 'Prime' : 'Normal';
    const endTime = performance.now();
    const timeTaken = endTime - startTime;

    table.append(`<tr><td>${i}</td><td>${isPrimeResult}</td><td>${timeTaken.toFixed(2)}</td></tr>`);
  }

  // Append the table below the time metrics
  $('#resultContainer').append(table);

  // Display table containing only prime numbers
  showPrimeTable(startRange, endRange);
}

// Function to display table containing only prime numbers
function showPrimeTable(start, end) {
  const primes = getPrimesInRange(start, end);

  // Create a table for prime numbers
  const primeTable = $('<table class="result-table">').append('<tr><th>Prime Number</th><th>Time Taken (ms)</th></tr>');
  for (const prime of primes) {
    const startTime = performance.now();
    const endTime = performance.now();
    const timeTaken = endTime - startTime;

    primeTable.append(`<tr><td>${prime}</td><td>${timeTaken.toFixed(2)}</td></tr>`);
  }

  // Append the prime table below the previous table
  $('#resultContainer').append(primeTable);
}