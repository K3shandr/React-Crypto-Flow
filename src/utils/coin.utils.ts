// Функции рассчета статистики
export const Utils = {
	// Среднее арифметическое
	countMean(action: number[]) {
		let sum: number = 0
		for (let item of action) {
			sum += item
		}
		return (sum / action.length)
	},
	// Дисперсия
	countVariance(action: number[]) {
		const n = action.length;
		const mean = action.reduce((acc, val) => acc + val, 0) / n;
		const deviations = action.map(val => val - mean);
		const squaredDeviations = deviations.map(val => val ** 2);
		const variance = squaredDeviations.reduce((acc, val) => acc + val, 0) / n;
		return variance
	},
	// Расчет медианы
	countMedian(action: number[]) {
		if (action.length === 0) {
			return 0;
		}
		const sortedNumbers = action.slice().sort((a, b) => a - b);
		const middleIndex = Math.floor(sortedNumbers.length / 2);
		if (sortedNumbers.length % 2 === 0) {
			return (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2;
		} else {
			return sortedNumbers[middleIndex];
		}
	},
	// Расчет массива дат для графика линейного (временного ряда)
	createReverseDateArray(days: number[]) {
		const today = new Date();
		const reverseDates = [];
		for (let i = days.length - 1; i >= 0; i--) {
			const date = new Date(today);
			date.setDate(today.getDate() - days[i]);

			const formattedDate = Utils.formatDate(date);
			reverseDates.push(formattedDate);
		}
		return reverseDates;
	},
	// Форматирование даты
	formatDate(date: Date) {
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();

		return `${Utils.padZero(day)}.${Utils.padZero(month)}.${year}`;
	},
	// Добавления нуля
	padZero(number: number) {
		return number.toString().padStart(2, '0');
	},
	// Расчет линии тренда методом наименьших квадратов.
	calculateTrendLine(data: number[]) {
		const n = data.length;
		let sumX = 0;
		let sumY = 0;
		let sumXY = 0;
		let sumX2 = 0;
		for (let i = 0; i < n; i++) {
			const x = i;
			const y = data[i];
			sumX += x;
			sumY += y;
			sumXY += x * y;
			sumX2 += x * x;
		}
		const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
		const intercept = (sumY - slope * sumX) / n;
		const trendLine = [];
		for (let i = 0; i < n; i++) {
			const x = i;
			const y = slope * x + intercept;
			trendLine.push(y);
		}
		return trendLine;
	},
	// Расчет дат для прогнозирования
	createForecastDatesArray(count: number) {
		if (count === 0) {
			return []
		}

		const today = new Date();
		const dates = [];

		for (let i = 1; i <= count; i++) {
			const date = new Date(today);
			date.setDate(today.getDate() + i);
			dates.push(date.toLocaleDateString());
		}

		return dates;
	},
	// Расчет прогнозирования методом линейной регрессии
	linearRegressionForecast(data: number[], numPredictions: number) {
		if (data.length < 2) {
			console.log("Недостаточно данных для прогнозирования");
			return [];
		}
		const predictions = [];
		const n = data.length;
		let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
		for (let i = 0; i < n; i++) {
			sumX += i;
			sumY += data[i];
			sumXY += i * data[i];
			sumX2 += i * i;
		}
		const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
		const intercept = (sumY - slope * sumX) / n;
		for (let i = 0; i < numPredictions; i++) {
			const nextX = n + i;
			const nextY = slope * nextX + intercept;
			predictions.push(nextY);
		}
		return predictions;
	},
	// Расчет абсолютного прироста
	calculateAbsoluteGrowth(dataArray: number[]) {
		var currentValue = dataArray[dataArray.length - 1];
		var previousValue = dataArray[0];
		var absoluteGrowth = currentValue - previousValue;
		return Math.abs(absoluteGrowth);
	},
	// Расчет темпа роста
	calculateGrowthRate(dataArray: number[]) {
		var currentValue = dataArray[dataArray.length - 1];
		var previousValue = dataArray[0];
		var growthRate = ((currentValue - previousValue) / previousValue) * 100;
		return growthRate;
	},
	// Расчет разброса
	calculateDifference(dataArray: number[]) {
		return Math.max(...dataArray) - Math.min(...dataArray)
	},
	// Расчет массива частот
	countOccurrences(arr: number[]) {
		var occurrences: any = {};
		var result = [];
		for (var i = 0; i < arr.length; i++) {
			var num = arr[i];
			occurrences[num] = occurrences[num] ? occurrences[num] + 1 : 1;
		}
		for (var key in occurrences) {
			if (occurrences.hasOwnProperty(key)) {
				result.push([parseInt(key), occurrences[key]]);
			}
		}
		return result;
	},
	// Расчет моды
	calculateMode(arr: number[]) {
		let occurrences = new Map();
		let maxCount = 0;
		let modes = [];
		for (let i = 0; i < arr.length; i++) {
			let num = arr[i];
			let count = occurrences.get(num) || 0;
			count++;
			occurrences.set(num, count);
			if (count > maxCount) {
				maxCount = count;
			}
		}
		for (let [num, count] of occurrences) {
			if (count === maxCount) {
				modes.push(num);
			}
		}
		return modes;
	},
	// Cреднеt арифметическое
	calculateMean(arr: number[]) {
		let sum = arr.reduce((acc, num) => acc + num, 0);
		return sum / arr.length;
	},
	// Рассчет среднего квадратического отклонения: 
	calculateStandardDeviation(arr: number[]) {
		let mean = Utils.calculateMean(arr);
		let deviations = arr.map(num => num - mean);
		let squaredDeviations = deviations.map(deviation => deviation ** 2);
		let meanSquaredDeviation = Utils.calculateMean(squaredDeviations);
		let standardDeviation = Math.sqrt(meanSquaredDeviation);
		return standardDeviation;
	},
	// Коэффициент вариации
	calculateCoefficientOfVariation(arr: number[]) {
		let mean = Utils.calculateMean(arr);
		let standardDeviation = Utils.calculateStandardDeviation(arr);
		let coefficientOfVariation = (standardDeviation / mean) * 100;
		return coefficientOfVariation;
	},
	// Коэффициент распределения Пирсона
	calculateSkewness(arr: number[]) {
		let mean = Utils.calculateMean(arr);
		let standardDeviation = Utils.calculateStandardDeviation(arr);
		let deviations = arr.map(num => (num - mean) / standardDeviation);
		let cubedDeviations = deviations.map(deviation => deviation ** 3);
		let meanCubedDeviation = Utils.calculateMean(cubedDeviations);
		let skewness = meanCubedDeviation;
		return skewness;
	},
	// Скошенность ряда
	determineSkewness(skewness: number) {
		if (skewness > 0) {
			return "Положительная асимметрия (правосторонняя)";
		}
		else if (skewness < 0) {
			return "Отрицательная асимметрия (левосторонняя)";
		} else {
			return "Симметричное распределение";
		}
	},
	// Эксцесс
	calculateKurtosis(arr: number[]) {
		let mean = Utils.calculateMean(arr);
		let standardDeviation = Utils.calculateStandardDeviation(arr);
		let deviations = arr.map(num => (num - mean) / standardDeviation);
		let fourthPowerDeviations = deviations.map(deviation => deviation ** 4);
		let meanFourthPowerDeviation = Utils.calculateMean(fourthPowerDeviations);
		let kurtosis = meanFourthPowerDeviation;
		return kurtosis;
	},
	// Степень существенности ассиметрии
	determineKurtosisSignificance(kurtosis: number) {
		if (kurtosis > 0) {
			return "Тяжелые хвосты (положительный эксцесс)";
		} else if (kurtosis < 0) {
			return "Легкие хвосты (отрицательный эксцесс)";
		} else {
			return "Нормальное распределение (нулевой эксцесс)";
		}
	}
}