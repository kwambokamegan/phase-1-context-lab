/* Your Code Here */
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
}

// Time Tracking Functions

function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });

    return this;
}

function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });

    return this;
}

function hoursWorkedOnDate(dateStamp) {
    const timeIn = this.timeInEvents.find(event => event.date === dateStamp);
    const timeOut = this.timeOutEvents.find(event => event.date === dateStamp);

    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(dateStamp) {
    const hoursWorked = hoursWorkedOnDate.call(this, dateStamp);
    return hoursWorked * this.payPerHour;
}


// Function to find an employee by first name
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

// Function to calculate payroll
function calculatePayroll(employees) {
    let totalPayroll = 0;
    employees.forEach(employee => {
        const totalWages = employee.wages.reduce((sum, wage) => sum + wage, 0);
        totalPayroll += totalWages;
    });
    return totalPayroll;
}

function calculatePayroll(employees) {
    let totalPayroll = 0;
    employees.forEach(employee => {
        const datesWorked = employee.timeInEvents.map(event => event.date);
        const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate.call(employee, date), 0);
        totalPayroll += totalWages;
    });
    return totalPayroll;
}








/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

