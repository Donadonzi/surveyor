const solution = (pot) => {
	const drains = (pot, x, y, direction) => {
		if (x < 0 || x >= pot[0].length || y < 0) {
			return false;
		}
		if (pot[y][x] == 1) {
			return false;
		}

		if (y == pot.length - 1) {
			return true;
		}
		if (direction === 'down') {
			return (
				drains(pot, x - 1, y, 'left') ||
				drains(pot, x, y + 1, 'down') ||
				drains(pot, x + 1, y, 'right')
			);
		} else if (direction === 'right') {
			return (
				drains(pot, x, y - 1, 'up') ||
				drains(pot, x, y + 1, 'down') ||
				drains(pot, x + 1, y, 'right')
			);
		} else if (direction === 'left') {
			return (
				drains(pot, x - 1, y, 'left') ||
				drains(pot, x, y + 1, 'down') ||
				drains(pot, x, y - 1, 'up')
			);
		} else if (direction === 'up') {
			return (
				drains(pot, x - 1, y, 'left') ||
				drains(pot, x, y - 1, 'up') ||
				drains(pot, x + 1, y, 'right')
			);
		}
	};

	for (let x = 0; x < pot[0].length; x++) {
		if (drains(pot, x, 0, 'down')) {
			return true;
		}
	}
	return false;
};
