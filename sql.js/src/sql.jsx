import React, { useEffect, useState } from 'react';
import initSqlJs from 'sql.js';
import Interphase from './interphase';

const SQLiteComponent = () => {
  const [dbData, setDbData] = useState(null);
  const [db, setDb] = useState(null);

  useEffect(() => {
    const loadAndRunSQL = async () => {
      try {
        const SQL = await initSqlJs({
          locateFile: file => `/node_modules/sql.js/dist/${file}`
        });

        // Load the database from local storage or create a new one
        const savedDB = localStorage.getItem('sqlite-db');
        const dbInstance = savedDB
          ? new SQL.Database(new Uint8Array(JSON.parse(savedDB)))
          : new SQL.Database();

        setDb(dbInstance);

        const sqlstr = `
          CREATE TABLE IF NOT EXISTS hello (Id int, User char);
          INSERT INTO hello VALUES (, '');
          INSERT INTO hello VALUES (, '');
          INSERT INTO hello VALUES (, '');
        `;
        dbInstance.run(sqlstr);
      

        fetchData(dbInstance);

      } catch (error) {
        console.error('Error loading SQL.js:', error);
      }
    };

    loadAndRunSQL();
  }, []);

  const fetchData = (dbInstance) => {
    const result = dbInstance.exec("SELECT * FROM hello");
    // console.log('Query Result:', savedDB);
    const rows = result[0].values; 
    setDbData(rows);
  };

  const handleAddData = (id, name) => {
    if (!db) return;

    // Execute SQL command to insert new data
    const sqlstr = `INSERT INTO hello (Id, User) VALUES (${id}, '${name}');`;
    db.run(sqlstr);

    // Update the table with new data
    fetchData(db);

    // Save the database to local storage
    const binaryArray = db.export();
    localStorage.setItem('sqlite-db', JSON.stringify(Array.from(binaryArray)));
    
   const Result1 = localStorage.getItem('sqlite-db');
   console.log(Result1);
  };
   
  return (
    <div>
      <h1>SQLite Component</h1>
      <Interphase onSubmit={handleAddData} />
      <div>
        <h2>Table Data</h2>
        {dbData ? (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {dbData.map((row, index) => (
                <tr key={index}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SQLiteComponent;
