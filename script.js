document.addEventListener('DOMContentLoaded', () => {
    const symptomButtons = document.querySelectorAll('.symptom-btn');
    const analyzeButton = document.getElementById('analyze-btn');
    const resultDiv = document.getElementById('result');

    let selectedSymptoms = [];
    let previousResultContent = ''; // 이전 결과 화면을 저장하는 변수

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
            displayDiseases(potentialDiseases);
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

        for (let disease in diseaseDatabase) {
            const diseaseSymptoms = diseaseDatabase[disease];
            if (symptoms.some(symptom => diseaseSymptoms.includes(symptom))) {
                matches.push(disease);
            }
        }

        return matches;
    }

    function displayDiseases(diseases) {
        let diseaseList = '<p>예상되는 질병:</p><ul>';
        diseases.forEach(disease => {
            diseaseList += `<li class="disease-item" data-disease="${disease}">${disease}</li>`;
        });
        diseaseList += '</ul>';
        previousResultContent = diseaseList; // 현재 결과 화면을 저장
        resultDiv.innerHTML = diseaseList;

        const diseaseItems = document.querySelectorAll('.disease-item');
        diseaseItems.forEach(item => {
            item.addEventListener('click', () => {
                const disease = item.getAttribute('data-disease');
                displayTreatmentAndHospital(disease);
            });
        });
    }

    function displayTreatmentAndHospital(disease) {
        const treatmentDatabase = {
            '독감': {
                treatment: '휴식과 충분한 수분 섭취가 중요합니다. 필요시 해열제를 복용하세요.',
                hospital: '내과 또는 가정의학과를 방문하세요.'
            },
            '감기': {
                treatment: '따뜻한 차와 꿀, 목을 보호하고 충분한 휴식을 취하세요.',
                hospital: '가정의학과 또는 이비인후과를 방문하세요.'
            },
            '편두통': {
                treatment: '진통제 복용과 함께 어두운 방에서 휴식을 취하세요.',
                hospital: '신경과를 방문하세요.'
            },
            '코로나-19': {
                treatment: '자가 격리 및 의료진의 지시를 따르세요. 증상 완화에 중점을 둡니다.',
                hospital: '호흡기내과 또는 코로나-19 진료소를 방문하세요.'
            },
            '위장 독감': {
                treatment: '수분 섭취와 식사 조절, 충분한 휴식이 필요합니다.',
                hospital: '소화기내과 또는 내과를 방문하세요.'
            },
            '알레르기': {
                treatment: '알레르기 유발 물질을 피하고 항히스타민제를 복용하세요.',
                hospital: '알레르기내과 또는 이비인후과를 방문하세요.'
            },
            '천식': {
                treatment: '처방된 흡입기를 사용하고, 천식을 유발하는 환경을 피하세요.',
                hospital: '호흡기내과를 방문하세요.'
            },
            '기관지염': {
                treatment: '충분한 휴식과 수분 섭취, 기침약 복용을 고려하세요.',
                hospital: '호흡기내과 또는 내과를 방문하세요.'
            },
            '식중독': {
                treatment: '수분 섭취를 늘리고 음식 섭취를 조절하며 필요시 의사의 진료를 받으세요.',
                hospital: '소화기내과 또는 내과를 방문하세요.'
            },
            // 추가 질병 및 치료법과 병원 정보
        };

        const treatmentInfo = treatmentDatabase[disease];
        if (treatmentInfo) {
            resultDiv.innerHTML = `<p><strong>${disease} 치료법:</strong> ${treatmentInfo.treatment}</p>
                                   <p><strong>권장 병원/전문과:</strong> ${treatmentInfo.hospital}</p>
                                   <button id="back-btn">뒤로 가기</button>`;
        } else {
            resultDiv.innerHTML = `<p>해당 질병에 대한 정보가 없습니다.</p>
                                   <button id="back-btn">뒤로 가기</button>`;
        }

        // "뒤로 가기" 버튼 클릭 이벤트 추가
        const backButton = document.getElementById('back-btn');
        backButton.addEventListener('click', () => {
            resultDiv.innerHTML = previousResultContent; // 이전 화면으로 돌아감
            const diseaseItems = document.querySelectorAll('.disease-item');
            diseaseItems.forEach(item => {
                item.addEventListener('click', () => {
                    const disease = item.getAttribute('data-disease');
                    displayTreatmentAndHospital(disease);
                });
            });
        });
    }
});
