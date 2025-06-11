import { screenWidth } from "./Constants"
import {showMessage} from 'react-native-flash-message';

export const showSuccess = message => {
  return showMessage({
    message: message,
    type: 'success',
    color: 'white',
    textStyle: {fontSize: screenWidth * 0.05},
    style: {alignItems: 'center'},
  });
};
 
export const showError = message => {
  return showMessage({
    message: message,
    type: 'danger',
    color: 'white',
    textStyle: {fontSize: screenWidth * 0.05},
    style: {alignItems: 'center'},
  });
};
 
export const setParams = (params = null) => {
  try {
    let _params = ``;
    let _index = 0;
  
  
    if(params) {
      _params += `?`;
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          if(_index !== 0) _params += '&';
          _params += (key + '=' + params[key]);
        }
  
        _index++;
      }
    }
  
  
    return _params;
  } catch (error) {
    console.log('set params error', error);
  }
}
   
export const setPersonNameCapitalize = (name) => {return name ? (name?.charAt(0).toUpperCase() + name?.slice(1)) : 'Anonymous Person';}

export const reponseMapping = (response: String) => {
  const sections = response.split(/\*\*(References|followUp):\*\*/g).map(s => s.trim());

  const responsePart = sections[0];
  const referencesPart = sections.find((_, i) => sections[i - 1] === 'References') || '';
  const followUpPart = sections.find((_, i) => sections[i - 1] === 'followUp') || '';

  const followUpLines = followUpPart.split('\n').map(line => line.trim()).filter(Boolean);
  const followUp = {
    question: followUpLines[0]?.replace(/^Question:\s*/, '') || '',
    options: followUpLines.slice(1).map(line => line.replace(/^\d+\.\s*/, '')),
  };

  const referenceLines = referencesPart
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

  const headers = referenceLines[0]
    ?.split('|')
    ?.map(h => h.trim().replace(/\*\*/g, ''))
    ?.filter(Boolean);

  const toCamelCase = (str: string): string =>
    str
      ?.toLowerCase()
      ?.replace(/[^a-zA-Z0-9 ]/g, '')
      ?.split(' ')
      ?.map((word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      )
      ?.join('');

  const camelHeaders = headers?.map(toCamelCase);
  const references = [];

  for (let i = 2; i < referenceLines.length; i++) {
    const cols = referenceLines[i]
      .split('|')
      .map(c => c.trim())
      .filter(Boolean);

    if (cols.length === camelHeaders.length) {
      const row: Record<string, string> = {};
      camelHeaders.forEach((key, index) => {
        row[key] = cols[index];
      });
      references.push(row);
    }
  }

  return {
    response: responsePart,
    references: references,
    followUp: followUp,
  };

}

export const hasMultipleReferencesWithDifferentDocuments = (documents) => {
  if (documents.length <= 1) return false;

  const firstDocName = documents[0].documentName;

  const allSame = documents.every(doc => doc.documentName === firstDocName);

  return !allSame;
}

export const capitalizeFirstLetter = (str: string) => {
  if (typeof str !== 'string' || str.length === 0) {
    return ''; // Return an empty string if it's empty or not a string
  }
  return str.charAt(0).toUpperCase(); // Return only the first letter, capitalized
};

export const toSnakeCase = (str: string) => {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_');
};

// export const getNextSessionId = (sessions: { sessionId: string | number | null | undefined }[]): string => {
//   if (sessions.length === 0) return "Session-1";

//   let maxNumber = 0;

//   sessions.forEach((session) => {
//     const rawId = session?.sessionId;

//     // Safely convert to string
//     const sessionId = String(rawId ?? '');

//     // Log for debugging
//     console.log('sessionId (string)', sessionId);

//     const match = sessionId.match(/Session-(\d+)/);
//     if (match) {
//       const num = parseInt(match[1], 10);
//       if (num > maxNumber) {
//         maxNumber = num;
//       }
//     }
//   });

//   return `Session-${maxNumber + 1}`;
// };

export const getNextSessionId = (
  sessions: { sessionId: string | number | null | undefined }[]
): string => {
  if (sessions.length === 0) return "Session-1";

  const rawId = sessions[0]?.sessionId;
  const sessionId = String(rawId ?? '');

  console.log('First sessionId (string)', sessionId);

  const match = sessionId.match(/Session-(\d+)/);
  const nextNumber = match ? parseInt(match[1], 10) + 1 : 1;

  return `Session-${nextNumber}`;
};
