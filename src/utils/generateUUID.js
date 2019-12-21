import uuid1 from 'uuid/v1';
import uuid4 from 'uuid/v4';
import uuid5 from 'uuid/v5';

export const generateUUID = () => {
  const timestampID = uuid1();
  const randomuuid = uuid4();
  return uuid5(timestampID, randomuuid);
};
