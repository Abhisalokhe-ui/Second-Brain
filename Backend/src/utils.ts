

export const random = (len:number):string => {
    const options = "qwertyuiopasdfghjklzxcvbnm12345678";  
    const optionsLength = options.length;
    let ans = "";  

    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * optionsLength);
        ans += randomIndex.toString(); // Store the index as a string
    }

    return ans; // Return index values as a string
};


