// src/components/Tracker.js
import React, { useEffect } from 'react';
import { createHoursEntry } from '../api';

function Tracker({ token }) {
  // Function to recalculate the final total from the "Total Hours" row
  function updateFinalTotal() {
    const totalHoursRow = Array.from(document.querySelectorAll('tbody tr'))
      .find(r => r.firstElementChild && r.firstElementChild.innerText === 'Total Hours');
    if (!totalHoursRow) return;
    let sum = 0;
    // Sum cells 1 .. (n - 2) because the last cell (#finalTotal) is not included
    for (let i = 1; i < totalHoursRow.children.length - 1; i++) {
      let val = parseFloat(totalHoursRow.children[i].innerText) || 0;
      sum += val;
    }
    const finalCell = document.getElementById('finalTotal');
    if (finalCell) {
      finalCell.innerText = sum.toFixed(2);
    }
  }

  // Function to send update for a given row to the backend
  function sendUpdate(row) {
    const cells = row.querySelectorAll('td');
    if (!cells.length) return; // Skip header rows
    const data = {
      rowHeading: row.querySelector('th') ? row.querySelector('th').innerText : '',
      cellValues: Array.from(cells).map(td => td.innerText)
    };
    // Example fetch to /update/ endpoint
    fetch('/update/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(respData => {
        console.log('Server success:', respData);
      })
      .catch(err => console.error('Server error:', err));
  }

  // Attach event listeners once the component mounts
  useEffect(() => {
    updateFinalTotal();
    // Use querySelectorAll on the rendered table to attach event listeners to editable cells
    const editableCells = document.querySelectorAll('tbody td[contentEditable="true"]');
    editableCells.forEach(cell => {
      // Use an inline function so we can update the totals and send the update when cell value changes
      cell.addEventListener('input', () => {
        updateFinalTotal();
        const row = cell.parentElement;
        sendUpdate(row);
      });
    });
    // Cleanup: Remove event listeners on unmount
    return () => {
      editableCells.forEach(cell => {
        cell.removeEventListener('input', () => {
          updateFinalTotal();
          const row = cell.parentElement;
          sendUpdate(row);
        });
      });
    };
  }, [token]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Nursing Hours Tracker</h1>
      <table>
        <thead>
          <tr>
            <th className="category-header" rowSpan="4"></th>
            <th colSpan="6">Phase I</th>
            <th colSpan="3">Phase II</th>
            <th className="category-header" rowSpan="2">Totals by Population</th>
          </tr>
          <tr>
            <th className="year1-header" colSpan="3">Year 1</th>
            <th className="year2-header" colSpan="3">Year 2</th>
            <th className="year3-header" colSpan="3">Year 3</th>
          </tr>
          <tr>
            <th className="year1-header">Summer</th>
            <th className="year1-header">Fall</th>
            <th className="year1-header">Spring</th>
            <th className="year2-header">Summer</th>
            <th className="year2-header">Fall</th>
            <th className="year2-header">Spring</th>
            <th className="year3-header">Summer</th>
            <th className="year3-header">Fall</th>
            <th className="year3-header">Spring</th>
            <th className="category-header" rowSpan="2"></th>
          </tr>
          <tr>
            <th className="year1-header">
              NURS5110<br />AHA (SIM)
            </th>
            <th className="year1-header">
              NURS6510-<br />Adult (90)
            </th>
            <th className="year1-header">
              NURS6512-<br />Peds (90)
            </th>
            <th className="year2-header">
              NURS6611-Fund<br />(180) &amp; NURS6610-<br />GYN (80)
            </th>
            <th className="year2-header">
              MM04001 -<br />Bushmaster &amp;<br />NURS6620 OMR<br />&amp; NURS6621<br />ADT (Skills/BM)
            </th>
            <th className="year2-header">
              NURS6620<br />Adv Concepts<br />AIACC (360)
            </th>
            <th className="year3-header">
              NURS5710-<br />DNP1 (315)
            </th>
            <th className="year3-header">
              NURS5720-<br />DNP2 (315)
            </th>
            <th className="year3-header">
              NURS5730-<br />DNP3 (315)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="category-header"></th>
            <td className="category-header" colSpan="11">Specific Specialty Rotations</td>
          </tr>
          <tr>
            <td colSpan="7">Newborn Exams (Peds)</td>
            <td colSpan="3">See Phase II Rotation Checklist</td>
          </tr>
          <tr>
            <th className="category-header">SIM CENTER/SKILLS LABS</th>
            <td className="category-header" colSpan="4">(SIM CENTER/SKILLS LABS)</td>
            <td className="category-header" colSpan="3">(SIM CENTER/SKILLS LABS)</td>
            <td className="category-header" colSpan="3">(SIM CENTER/SKILLS LABS)</td>
          </tr>
          <tr>
            <th>Hours</th>
            <td contentEditable="true">(SIM/SKILLS-<br />20)</td>
            <td contentEditable="true">(SIM -9)</td>
            <td contentEditable="true">
              (SIM - 10)<br />(US - 8)<br />(ATLS - 16)<br />(TCCC - 4)
            </td>
            <td contentEditable="true">
              (SIM/GUTA-20)<br />(SUTURE LAB-2)
            </td>
            <td contentEditable="true">
              (BM - 50)<br />(SKILLS -12)
            </td>
            <td contentEditable="true">(SIM - 4)</td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
          </tr>
          <tr>
            <th># Patients</th>
            <td contentEditable="true">18</td>
            <td contentEditable="true">7</td>
            <td contentEditable="true">9</td>
            <td contentEditable="true">1</td>
            <td contentEditable="true">25</td>
            <td contentEditable="true">4</td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
          </tr>
          <tr>
            <th className="category-header" colSpan="11">Adult (18-60 yrs.)</th>
          </tr>
          <tr>
            <th>Hours</th>
            <td contentEditable="true"></td>
            <td contentEditable="true">81</td>
            <td contentEditable="true"></td>
            <td contentEditable="true">172</td>
            <td contentEditable="true"></td>
            <td contentEditable="true">147</td>
            <td contentEditable="true">240.12</td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
          </tr>
          <tr>
            <th># Patients</th>
            <td contentEditable="true"></td>
            <td contentEditable="true">60</td>
            <td contentEditable="true"></td>
            <td contentEditable="true">262</td>
            <td contentEditable="true"></td>
            <td contentEditable="true">188</td>
            <td contentEditable="true">163</td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
          </tr>
          <tr>
            <th className="category-header" colSpan="10">PEDS (0-18 yrs.)</th>
            <th className="category-header">
              FNP=180 hrs<br />WH/dual=240hr
            </th>
          </tr>
          <tr>
            <th>Hours</th>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true">90</td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true">7</td>
            <td contentEditable="true">4.61</td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
          </tr>
          <tr>
            <th># Patients</th>
            <td contentEditable="true"></td>
            <td contentEditable="true">60</td>
            <td contentEditable="true"></td>
            <td contentEditable="true">262</td>
            <td contentEditable="true"></td>
            <td contentEditable="true">188</td>
            <td contentEditable="true">163</td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
          </tr>
          <tr>
            <th className="category-header" colSpan="10">GYN</th>
            <th className="category-header">
              FNP=45hrs<br />WH/dual=240hr
            </th>
          </tr>
          <tr>
            <th>Hours</th>
            <td contentEditable="true"></td>
            <td contentEditable="true">1</td>
            <td contentEditable="true"></td>
            <td contentEditable="true">18</td>
            <td contentEditable="true"></td>
            <td contentEditable="true">33</td>
            <td contentEditable="true">10.6</td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
          </tr>
          <tr>
            <th># Patients</th>
            <td contentEditable="true"></td>
            <td contentEditable="true">1</td>
            <td contentEditable="true"></td>
            <td contentEditable="true">10</td>
            <td contentEditable="true"></td>
            <td contentEditable="true">52</td>
            <td contentEditable="true">7</td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
          </tr>
          <tr>
            <th className="category-header" colSpan="10">OB</th>
            <th className="category-header">
              FNP=45hrs<br />WH/dual=180hr
            </th>
          </tr>
          <tr>
            <th>Hours</th>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true">57</td>
            <td contentEditable="true"></td>
            <td contentEditable="true">57</td>
            <td contentEditable="true">32.6</td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
          </tr>
          <tr>
            <th># Patients</th>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true">83</td>
            <td contentEditable="true"></td>
            <td contentEditable="true">59</td>
            <td contentEditable="true">20</td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
          </tr>
          <tr>
            <th className="category-header" colSpan="10">Geriatric (&gt;60 years)</th>
            <th className="category-header">All=90 hrs.</th>
          </tr>
          <tr>
            <th>Hours</th>
            <td contentEditable="true"></td>
            <td contentEditable="true">11</td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true">44</td>
            <td contentEditable="true">27.57</td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
          </tr>
          <tr>
            <th># Patients</th>
            <td contentEditable="true"></td>
            <td contentEditable="true">9</td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true">50</td>
            <td contentEditable="true">19</td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
          </tr>
          <tr>
            <th>Total Hours</th>
            <td contentEditable="true">20</td>
            <td contentEditable="true">102</td>
            <td contentEditable="true">128</td>
            <td contentEditable="true">269</td>
            <td contentEditable="true">62</td>
            <td contentEditable="true">292</td>
            <td contentEditable="true">316</td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td id="finalTotal" contentEditable="false"></td>
          </tr>
          <tr>
            <th>Cumulative Total Hours</th>
            <td contentEditable="true">20</td>
            <td contentEditable="true">122</td>
            <td contentEditable="true">250</td>
            <td contentEditable="true">519</td>
            <td contentEditable="true">581</td>
            <td contentEditable="true">873</td>
            <td contentEditable="true">1189</td>
            <td contentEditable="true"></td>
            <td contentEditable="true"></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Tracker;
