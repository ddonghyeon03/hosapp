document.addEventListener('DOMContentLoaded', () => {
    const symptomButtons = document.querySelectorAll('.symptom-btn');
    const analyzeButton = document.getElementById('analyze-btn');
    const resultDiv = document.getElementById('result');

    let selectedSymptoms = [];

    symptomButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('selected');
            const symptom = button.getAttribute('data-symptom');

            if (selectedSymptoms.includes(symptom)) {
                selectedSymptoms = selectedSymptoms.filter(s => s !== symptom);
            } else {
                selectedSymptoms.push(symptom);
            }
        });
    });

    analyzeButton.addEventListener('click', () => {
        if (selectedSymptoms.length === 0) {
            resultDiv.innerHTML = "<p>증상을 선택해주세요.</p>";
        } else {
            const potentialDiseases = analyzeSymptoms(selectedSymptoms);
            resultDiv.innerHTML = `<p>예상되는 질병: ${potentialDiseases.join(', ')}</p>`;
        }
        resultDiv.style.display = 'block';
    });

    function analyzeSymptoms(symptoms) {
        const diseaseDatabase = {
            '독감': ['fever', 'cough', 'fatigue', 'sore throat', 'runny nose'],
            '감기': ['cough', 'runny nose', 'sore throat'],
            '편두통': ['headache', 'nausea'],
            '코로나-19': ['fever', 'cough', 'fatigue', 'shortness of breath', 'loss of taste or smell'],
            '위장 독감': ['nausea', 'vomiting', 'diarrhea'],
            '알레르기': ['runny nose', 'sore throat', 'rash'],
            '천식': ['shortness of breath', 'cough', 'chest pain'],
            '기관지염': ['cough', 'fatigue', 'shortness of breath', 'chest pain'],
            '식중독': ['nausea', 'vomiting', 'diarrhea'],
            // 추가 질병 데이터
        };

        let matches = [];

        // for (let disease in diseaseDatabase) {
        //     const diseaseSymptoms = diseaseDatabase[disease];
        //     const matchCount = symptoms.filter(symptom => diseaseSymptoms.includes(symptom)).length;

        //     // 적어도 절반 이상의 증상이 일치하는 경우 질병으로 간주
        //     if (matchCount >= Math.ceil(diseaseSymptoms.length / 2)) {
        //         matches.push(disease);
        //     }
        for (let disease in diseaseDatabase) {
            const diseaseSymptoms = diseaseDatabase[disease];
            if (symptoms.some(symptom => diseaseSymptoms.includes(symptom))) {
                matches.push(disease);
            }

        }

        return matches;
    }
});


