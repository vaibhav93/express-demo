

var create = function(pool,request,response){
	pool.getConnection(
		function(err,connection){
			if(err){
				console.log('error getting conn from pool');
				return response({error:'error getting connection'});
			}
			connection.execute(
				'INSERT INTO employees '+
				'(EMPLOYEE_ID,FIRST_NAME, LAST_NAME,EMAIL,HIRE_DATE,JOB_ID,SALARY)' +
				'VALUES ' +
				'(:empid, :fname, :lname, :email,TO_DATE(:hireDate,\'DD-MON-YY\'),:jobId,:salary)',
				[request.empid,request.fname,request.lname,request.email,request.hireDate,request.jobId,request.salary],
				function(err, result)
				{
					if (err) {
						console.log(err.message);
						doRelease(connection);
						return response({error:err.message});
						
					}
					doRelease(connection);
					return response({status:'OK 200'});
					
				});
		})
}

var update = function(pool,request,response){
	pool.getConnection(
		function(err,connection){
			if(err){
				console.log('error getting conn from pool');
				return response({error:'error getting connection'});
			}
			connection.execute(
				'UPDATE employees ' +
				'SET FIRST_NAME = :fname,'+
				 'LAST_NAME = :lname,'+
				'EMAIL = :email,'+
				'SALARY = :salary '+
				'WHERE EMPLOYEE_ID =:empid',
				[request.fname,request.lname,request.email,request.salary,request.empid],

				function(err, result)
				{
					if (err) {
						console.error(err.message);
						doRelease(connection);
						return response({error:err.message});
					}
					doRelease(connection);
					return response({status:'OK 200'});
					
				});
		})
}

var Delete = function(pool,request,response){
	pool.getConnection(
		function(err,connection){
			if(err){
				console.log('error getting conn from pool');
				return response({error:'error getting connection'});
			}
			connection.execute(
				'DELETE from employees ' +
				'WHERE EMPLOYEE_ID =:empid',
				[request.empid],
				function(err, result)
				{
					if (err) {
						console.error(err.message);
						doRelease(connection);
						return response({error:err.message});
					}
					doRelease(connection);
					return response({status:'OK 200'});
					
				});
		})
}

var find = function(pool,response){	
	 pool.getConnection(
	  function(err, connection)
	  {
	    if (err) {
	      console.error(err.message);
	      return;
	    }
	    connection.execute(
		'SELECT employee_id, ' +
	        '    first_name, ' +
	        '    last_name, ' +
	        '    email, ' +
	        '    phone_number, ' +
	        '    TO_CHAR(hire_date) AS hire_date, ' +
	        '    job_id, ' +
	        '    salary ' +
	        'FROM employees',
		[],

	      function(err, result)
	      {
	        if (err) {
	          console.error(err.message);
	          doRelease(connection);
	          return response({error:err.message});
	        }
	        doRelease(connection);
		return response(result.rows);
	      });
	  });


}

function doRelease(connection)
{
  connection.release(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
}
module.exports.find = find;
module.exports.create = create;
module.exports.update = update;
module.exports.delete = Delete;
