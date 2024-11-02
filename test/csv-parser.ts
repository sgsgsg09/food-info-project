const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// CSV 파일 경로 설정 (파일 경로를 절대 경로로 설정)
const csvFilePath = path.join(__dirname, '../FoodNutritionData.csv');

// 파싱된 데이터를 저장할 배열
const results = [];

// CSV 파일을 읽고 데이터를 파싱하는 함수
function parseCsvFile() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        // 필요한 필드만 추출하여 results 배열에 추가
        results.push({
          name: data['식품명'],
          calories: parseFloat(data['에너지(kcal)']),
          protein: parseFloat(data['단백질(g)']),
          fat: parseFloat(data['지방(g)']),
          carbs: parseFloat(data['탄수화물(g)']),
          fiber: parseFloat(data['식이섬유(g)']),
        });
      })
      .on('end', () => {
        // 파싱이 완료되면 데이터를 출력
        console.log('Parsed CSV Data:', results);
        resolve(results);
      })
      .on('error', (error) => reject(`Error reading CSV file: ${error.message}`));
  });
}

// CSV 파일 파싱 함수 호출
parseCsvFile()
  .then((data) => console.log('CSV 파일 데이터:', data))
  .catch((error) => console.error('Error:', error));