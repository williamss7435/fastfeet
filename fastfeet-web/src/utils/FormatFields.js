export function getInitials(data){
    try {
        const splitData = data.split(" ");

         return (
            splitData.length > 1 ? 
                splitData[0].charAt(0) + splitData[1].charAt(0)
                : 
                data.charAt(0) + data.charAt(1) 
          );

    } catch (error) {
        return data;
    }
}