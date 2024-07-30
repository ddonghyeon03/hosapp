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
            resultDiv.innerHTML = "<p>Please select at least one symptom.</p>";
        } else {
            const potentialDiseases = analyzeSymptoms(selectedSymptoms);
            resultDiv.innerHTML = `<p>Based on the selected symptoms, you may have: ${potentialDiseases.join(', ')}</p>`;
        }
        resultDiv.style.display = 'block';
    });

    function analyzeSymptoms(symptoms) {
        const diseaseDatabase = {
            'flu': ['fever', 'cough', 'fatigue', 'sore throat', 'runny nose'],
            'cold': ['cough', 'runny nose', 'sore throat'],
            'migraine': ['headache', 'nausea'],
            'covid-19': ['fever', 'cough', 'fatigue', 'shortness of breath', 'loss of taste or smell'],
            'stomach flu': ['nausea', 'vomiting', 'diarrhea'],
            'allergy': ['runny nose', 'sore throat', 'rash'],
            'asthma': ['shortness of breath', 'cough', 'chest pain'],
            'bronchitis': ['cough', 'fatigue', 'shortness of breath', 'chest pain'],
            'food poisoning': ['nausea', 'vomiting', 'diarrhea'],
            // 추가 질병 데이터
        };

        let matches = [];

        for (let disease in diseaseDatabase) {
            const diseaseSymptoms = diseaseDatabase[disease];
            const matchCount = symptoms.filter(symptom => diseaseSymptoms.includes(symptom)).length;

            // 적어도 절반 이상의 증상이 일치하는 경우 질병으로 간주
            if (matchCount >= Math.ceil(diseaseSymptoms.length / 2)) {
                matches.push(disease);
            }
        }

        return matches;
    }
});
