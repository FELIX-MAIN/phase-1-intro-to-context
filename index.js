// Your code here
var createEmployeeRecord = function(put){
    return {
        firstName: put[0],
        familyName: put[1],
        title: put[2],
        payPerHour: put[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

var createEmployeeRecords = function(employeeputData) {
    return employeeputData.map(function(put){
        return createEmployeeRecord(put)
    })
}

var createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

var createTimeOutEvent = function(employee, dateStamp){
    var [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

var hoursWorkedOnDate = function(employee, soughtDate){
    var inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    var outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

var wagesEarnedOnDate = function(employee, dateSought){
    var rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

var allWagesFor = function(employee){
    var eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    var payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

var findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

var calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}
