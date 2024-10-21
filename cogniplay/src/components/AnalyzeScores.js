import React, { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, model } from './firebase';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './AnalyzeScores.css';

const AnalyzeScores = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [playerName, setPlayerName] = useState('');

  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  const fetchScoresAndAge = async () => {
    const userId = auth.currentUser.uid;
    const activeSubAccount = JSON.parse(sessionStorage.getItem('activeSubAccount'));
    const accountRef = doc(db, 'users', userId, 'subAccounts', activeSubAccount.id);
    const subAccountDoc = await getDoc(accountRef);

    if (subAccountDoc.exists()) {
      const data = subAccountDoc.data();
      setPlayerName(data.name);  // Set the player's name
      const age = calculateAge(data.dateOfBirth);
      return {
        scores: data.scores,
        age
      };
    } else {
      throw new Error('Sub-account data not found');
    }
  };

  const categorizeScores = (scores) => {
    return {
      memoryGames: {
        score: scores.level1 || 0,
        simonSays: scores.level4 || 0,
      },
      numericalAndMathematicalGames: {
        score: scores.level2 || 0,
      },
      problemSolvingGames: {
        score: scores.level3 || 0,
      },
      visualPerceptionAndRecognitionGames: {
        score: scores.level5 || 0,
      },
      socialCognition: {
        score: scores.level6 || 0,
      },
      attentionAndReactionGames: {
        score: scores.level7 || 0,
      }
    };
  };

  const analyzeScores = async () => {
    setLoading(true);
    try {
      const { scores, age } = await fetchScoresAndAge();
      const categorizedScores = categorizeScores(scores);

      const prompt = `
        Analyze the following cognitive skills scores for a player aged ${age}:
        Memory Games: ${JSON.stringify(categorizedScores.memoryGames)}.
        Numerical and Mathematical Games: ${JSON.stringify(categorizedScores.numericalAndMathematicalGames)}.
        Problem-Solving Games: ${JSON.stringify(categorizedScores.problemSolvingGames)}.
        Visual Perception and Recognition Games: ${JSON.stringify(categorizedScores.visualPerceptionAndRecognitionGames)}.
        Social Cognition: ${JSON.stringify(categorizedScores.socialCognition)}.
        Attention and Reaction Games: ${JSON.stringify(categorizedScores.attentionAndReactionGames)}.
        Provide clear insights and tips for improvement for each category. Do not mention levels or use symbols like *.
      `;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = await response.text();

      const cleanedText = text.replace(/[*]/g, '');
      const structuredReport = formatReport(cleanedText);

      setReport(structuredReport);
    } catch (error) {
      console.error('Error analyzing scores:', error);
    }
    setLoading(false);
  };

  const formatReport = (text) => {
    const sections = text.split(/Memory Games|Numerical and Mathematical Games|Problem-Solving Games|Visual Perception and Recognition Games|Social Cognition|Attention and Reaction Games/);

    const formatSection = (section) => {
      if (!section) return "No data available";
      return section
        .replace(/Insights:/g, '<br/><strong>Insights:</strong>')
        .replace(/Tips to Improve:/g, '<br/><strong>Tips to Improve:</strong>')
        .replace(/\n/g, '<br/>');
    };

    return {
      memoryGames: formatSection(sections[1]),
      numericalAndMathematicalGames: formatSection(sections[2]),
      problemSolvingGames: formatSection(sections[3]),
      visualPerceptionAndRecognitionGames: formatSection(sections[4]),
      socialCognition: formatSection(sections[5]),
      attentionAndReactionGames: formatSection(sections[6]),
    };
  };

  const generatePDF = () => {
    const reportElement = document.querySelector('.report');
    const doc = new jsPDF('p', 'pt', 'a4');
    const margin = 10;
    const pdfWidth = doc.internal.pageSize.getWidth() - 2 * margin;
    const pdfHeight = doc.internal.pageSize.getHeight() - 2 * margin;

    html2canvas(reportElement, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      doc.save('AnalysisReport.pdf');
    });
  };

  return (
    <div className="analyze-scores">
      <button onClick={analyzeScores} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Scores'}
      </button>
      {report && (
        <>
          <div className="report">
            <h2>Analysis Report of {playerName}</h2> {/* Added player name here */}
            <div className="report-cards">
              <div className="card">
                <h3>Memory Games</h3>
                <div dangerouslySetInnerHTML={{ __html: report.memoryGames }} />
              </div>
              <div className="card">
                <h3>Numerical and Mathematical Games</h3>
                <div dangerouslySetInnerHTML={{ __html: report.numericalAndMathematicalGames }} />
              </div>
              <div className="card">
                <h3>Problem-Solving Games</h3>
                <div dangerouslySetInnerHTML={{ __html: report.problemSolvingGames }} />
              </div>
              <div className="card">
                <h3>Visual Perception and Recognition Games</h3>
                <div dangerouslySetInnerHTML={{ __html: report.visualPerceptionAndRecognitionGames }} />
              </div>
              <div className="card">
                <h3>Social Cognition</h3>
                <div dangerouslySetInnerHTML={{ __html: report.socialCognition }} />
              </div>
              <div className="card">
                <h3>Attention and Reaction Games</h3>
                <div dangerouslySetInnerHTML={{ __html: report.attentionAndReactionGames }} />
              </div>
            </div>
          </div>
          <button onClick={generatePDF}>Download Report as PDF</button>
        </>
      )}
    </div>
  );
};

export default AnalyzeScores;
