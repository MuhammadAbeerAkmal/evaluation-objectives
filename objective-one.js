function calculateMedian(array1, array2) {
	const x = array1.length;
	const y = array2.length;

	let low = 0;
	let high = x;

	while (low <= high) {
		const partitionA = Math.floor((low + high) / 2);
		const partitionB = Math.floor((x + y + 1) / 2) - partitionA;

		const maxA = (partitionA === 0) ? Number.NEGATIVE_INFINITY: array1[partitionA - 1];
		const minA = (partitionA === x) ? Number.POSITIVE_INFINITY : array1[partitionA];

		const maxB = (partitionB === 0) ? Number.NEGATIVE_INFINITY : array2[partitionB - 1];
		const minB = (partitionB === y) ? Number.POSITIVE_INFINITY : array2[partitionB];

		if (maxA <= minB && maxB <= minA) {
			// Found the correct partition
			if ((x + y) % 2 === 0) {
				return (Math.max(maxA, maxB) + Math.min(minA, minB)) / 2;
			} else {
				return Math.max(maxA, maxB);
			}
		} else if (maxA > minB) {
			high = partitionA - 1;
		} else {
			low = partitionA + 1;
		}
	}

	throw new Error('Input arrays are not sorted.');
}

// Results here!
const nums1_example1 = [1, 3];
const nums2_example1 = [2];
console.log(calculateMedian(nums1_example1, nums2_example1));

const nums1_example2 = [1, 2];
const nums2_example2 = [3, 4];
console.log(calculateMedian(nums1_example2, nums2_example2));