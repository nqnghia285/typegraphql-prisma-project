function isExist(...args: any[]): boolean {
	let result = true;

	args.forEach((arg) => {
		if (arg === undefined || arg === null) {
			return (result = false);
		}
	});

	return result;
}

export default isExist;
