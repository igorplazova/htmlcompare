import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';


function App() {

  const [selectedFile1, setSelectedFile1] = useState();

  const [selectedFile2, setSelectedFile2] = useState();
	
  const [output, setOutput] = useState();
	
  const changeHandler1 = (event) => {
		setSelectedFile1(event.target.files[0]);
	};


  const changeHandler2 = (event) => {
		setSelectedFile2(event.target.files[0]);
	};


  const compare = () => {
    const formData = new FormData();

		formData.append('file1', selectedFile1);
    formData.append('file2', selectedFile2);

		fetch(
        'https://htmlcompareservice.fantasticoder.com/compare_html/compare/',
        {
          method: 'POST',
          body: formData,
        }
      )
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
        setOutput(result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	  };
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        <input type="file" name="file1" onChange={changeHandler1} />
        <input type="file" name="file2" onChange={changeHandler2} />
        <button onClick={compare}>Compare</button>
      </div>
      {output && <div>
        
        <p>Modified Percent: {output.modified_percent}</p>
        <p>Score: {100 - output.modified_percent}</p>
        <p>
        Errors1:
        <pre>{output.errors.file1}
        </pre>
        
        </p>
        <p>
        Errors2:
        <pre>
        {output.errors.file2}
        </pre>
        
        </p>

        <div>
        Diff: 
        <img src={output.diff} ></img>
        </div>

        
      </div>}
    </div>
  );
}

export default App;
