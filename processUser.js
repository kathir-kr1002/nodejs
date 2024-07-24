const processUserParallel = async (userId) => {
    try {
      const userPromise = fetchUserData(userId);
      const anotherTaskPromise = someOtherAsyncTask();
  
      const [user, anotherTaskResult] = await Promise.all([userPromise, anotherTaskPromise]);
  
      console.log('User data fetched:', user);
      console.log('Another task result:', anotherTaskResult);
  
    } catch (error) {
      console.error('Error processing user:', error);
    }
  };
  