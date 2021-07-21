

class ArrayUtil{

    async map(arr, callback){
        return await Promise.all(arr.map(callback));
    }

    async forEach(arr, callback){
        await Promise.all(arr.map(callback));
    }

    async filter(arr, callback) {
        const results = await Promise.all(arr.map(callback));
        return arr.filter((element,index) => results[index]);
    }

}

module.exports = new ArrayUtil();
