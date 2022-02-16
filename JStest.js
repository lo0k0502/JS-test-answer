// First part

const factories = [
  { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
  { name: "BR2", employees: ["Jessie", "Karen", "John"] },
  { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
  { name: "BR4", employees: [] }
];

// 1. Count Employees Number by Factory // => [ {name: 'BR1', count: 4}, ... ]
const employeesNumberByFactory = (factories) => {
      const tmp = [];

      // For each factory, add an object of their name and employees number into the temporary array.
      factories.forEach((factory) => {
            tmp.push({ name: factory.name, count: factory.employees.length });
      });

      return tmp;
};

// Print out the result array.
console.log("Q1:");
console.log(employeesNumberByFactory(factories));
console.log("\n");


// 2. Count Factories Number by Employee // => [ {employee: 'John', count: 2}, ... ]

const factoriesNumberByEmployee = (factories) => {
      const tmp = [];
      const recordedEmployees = [];

      // Loop through each employee in each factory.
      factories.forEach((factory) => {
            factory.employees.forEach((employee) => {
                  // If the recordedEmployees array already have a employee with the same name, add the count and skip to the next employee.
                  if (recordedEmployees.includes(employee)) {
                        tmp.find(employeeElement => employee === employeeElement.employee).count++;
                        return;
                  }

                  // If there are no employee with the same name in the recordedEmployees array,
                  // add this new name to the recordedEmployees array and add an object of the employee's name and his/her factory count to the temporary array.
                  recordedEmployees.push(employee);
                  tmp.push({ employee, count: 1 });
            });
      });

      return tmp;
};

// Print out the result array.
console.log("Q2:");
console.log(factoriesNumberByEmployee(factories));
console.log("\n");


// 3. Order employees list by alphabetical order // =>   { name: "BR2", employees: ["Jessie", "John", "Karen"] }
// Sort each employees list using sort function.
factories.forEach((factory) => {
      factory.employees.sort();
});

// Print out the factories array.
console.log("Q3:");
console.log(factories);
console.log("\n");

// Second part

const employeeType = [
      {id: 1, "name": "FullTime", work_begin: "09:00:00", work_end: "17:00:00"},
      {id: 2, "name": "MidTime", work_begin: "12:00:00", work_end: "21:00:00"},
      {id: 3, "name": "HalfTime", work_begin: "20:00:00", work_end: "00:00:00"},
];

const employees = [
        {id: 1, name: "Alice", type: 2},
        {id: 2, name: "Bob", type: 3},
        {id: 3, name: "John", type: 2},
        {id: 4, name: "Karen", type: 1},
        {id: 5, name: "Miles", type: 3},
        {id: 6, name: "Henry", type: 1}
];

const tasks = [
      {id: 1, title: "task01", duration: 60 /*min*/},
      {id: 2, title: "task02", duration: 120},
      {id: 3, title: "task03", duration: 180},
      {id: 4, title: "task04", duration: 360},
      {id: 5, title: "task05", duration: 30},
      {id: 6, title: "task06", duration: 220},
      {id: 7, title: "task07", duration: 640},
      {id: 8, title: "task08", duration: 250},
      {id: 9, title: "task09", duration: 119},
      {id: 10, title: "task10", duration: 560},
      {id: 11, title: "task11", duration: 340},
      {id: 12, title: "task12", duration: 45},
      {id: 13, title: "task13", duration: 86},
      {id: 14, title: "task14", duration: 480},
      {id: 15, title: "task15", duration: 900}
];

// 4. Count total hours worked in 1 day ? // => 39
const countTotalHoursWorkedPerDay = (employees) => {
      let sum = 0;
      const work_time_array = [];

      // Count every type's work hour and add it to the work_time_array.
      employeeType.forEach((type) => {
            const work_begin_array = type.work_begin.split(":"); // "09:00:00" => [ "09", "00", "00" ]
            const work_end_array = type.work_end.split(":"); // "17:00:00" => [ "17", "00", "00" ]

            // Count the hour deviation. If the deviation is smaller than zero (means the end time is tomorrow), add 24 to it.
            let deviation = parseInt(work_end_array[0], 10) - parseInt(work_begin_array[0], 10);
            if (deviation < 0) {
                  deviation += 24;
            }

            work_time_array.push({ id: type.id, work_time: deviation });
      });

      // Loop through all employees, find each work time by the work_time_array we just made and add them to sum.
      employees.forEach((employee) => {
            sum += work_time_array.find((type) => type.id === employee.type).work_time;
      });

      return sum;
};

// Print out the result.
console.log("Q4:");
console.log(countTotalHoursWorkedPerDay(employees));
console.log("\n");


// 5. Make a function that take as parameters dayTime and return number of employee working // howManyEmployeeByTime(time) => int
const howManyEmployeeByTime = (time/* Assume the format is string and looks like "hh:mm:ss" */) => {
      let sum = 0;
      const time_array = time.split(":"); // "12:00:00" => [ "12", "00", "00" ]
      const working_type = []; // IDs of employeeType of employees who are currently working.

      employeeType.forEach((type) => {
            const work_begin_array = type.work_begin.split(":"); // "09:00:00" => [ "09", "00", "00" ]
            const work_end_array = type.work_end.split(":"); // "17:00:00" => [ "17", "00", "00" ]

            // Count the hour deviation. If the deviation is smaller than zero (means the end time is tomorrow), add 24 to it.
            let deviation = parseInt(work_end_array[0], 10) - parseInt(work_begin_array[0], 10);
            if (deviation < 0) {
                  deviation += 24;
            }

            // If the hour of time received is smaller than the begin hour,
            // and is also bigger than the begin hour plus the type's working time if it plus 24,
            // then the time received is not in the working time of the employeeType.
            if (parseInt(time_array[0], 10) < parseInt(work_begin_array[0], 10) 
                  && (parseInt(time_array[0], 10) + 24) > (parseInt(work_begin_array[0], 10) + deviation)) {
                  return;
            }

            working_type.push(type.id);

      });

      // Loop through all employees, if that employee is the type that should be working, add one to sum.
      employees.forEach((employee) => {
            if (working_type.includes(employee.type)) {
                  sum++;
            }
      });

      return sum;
};

// Print out the result.
console.log("Q5:");
console.log(howManyEmployeeByTime("09:00:00"));
console.log("\n");


// 6. How many days of work needed to done all tasks ? // => 1 day = 9:00 to 00:00 between 00:00 and 09:00 doesn't count.
const daysToDoneAllTasks = (tasks) => {
      let result = 0;

      // Count how many minutes is needed to done all tasks.
      tasks.forEach((task) => {
            result += task.duration;
      });

      result /= 60; // Convert the time to hours.
      result /= 42; // We can do 42 hours per day, so divide the time by 42.

      // The result could be float, so we should always plus one if the result is not exactly an integer.
      result = Math.ceil(result);

      return result;
};

// Print out the result.
console.log("Q6:");
console.log(daysToDoneAllTasks(tasks));
console.log("\n");

