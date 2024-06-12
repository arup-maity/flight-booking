interface Auth {
   role: string;
   id?: number | string;
   accessPurpose?: string;
   purpose?: string;
   exp?: string;
}

interface Rule {
   role: string;
   action: string;
   target: string;
   condition?: (id: number | string, authId?: number | string) => boolean;
}
interface AttributesType {
   action: string;
   target: string;
   auth: Auth;
   id?: number | string;
}
// export const Ability = (action: string, target: string, auth: Auth, id: number | string): boolean => {
//    const userRole = auth.role;
//    const allowedActions = new Map([
//       ['administrator', ['manage', 'all']],
//       ['admin', ['read', 'delete'].includes(action) ? ['read', 'delete'] : []],
//       ['editor', []], // Placeholder for editor rules, if needed
//    ]);

//    const permissionGranted = allowedActions.get(userRole) &&
//       (allowedActions.get(userRole)[0] === 'all' || target === allowedActions.get(userRole)[1]) &&
//       (allowedActions.get(userRole)[0] === 'manage' || action === allowedActions.get(userRole)[2]);

//    if (permissionGranted && allowedActions.get(userRole)[3]) { // Check for conditional logic if applicable
//       return allowedActions.get(userRole)[3](id, auth.id);
//    }

//    return permissionGranted;
// };

export const Ability = (action: string, target: string, auth: any, id?: number | string): boolean => {
   const Param: Rule[] = [
      // administrator
      { role: 'administrator', action: 'manage', target: 'all' },

      // admin
      { role: 'admin', action: 'manage', target: 'flight' },
      { role: 'admin', action: 'manage', target: 'booking' },
      { role: 'admin', action: 'manage', target: 'user' },
      { role: 'admin', action: 'read', target: 'city' },
      { role: 'admin', action: 'read', target: 'airplane' },
      { role: 'admin', action: 'read', target: 'airport' },

      // customerSupport
      { role: 'customerSupport', action: 'manage', target: 'booking' },

      // technicalSupport
      { role: 'technicalSupport', action: 'manage', target: 'flight' },
      { role: 'technicalSupport', action: 'manage', target: 'booking' },
      { role: 'technicalSupport', action: 'read', target: 'user' },
      { role: 'technicalSupport', action: 'manage', target: 'city' },
      { role: 'technicalSupport', action: 'manage', target: 'airplane' },
      { role: 'technicalSupport', action: 'manage', target: 'airport' },

      // salesAgent
      { role: 'salesAgent', action: 'read', target: 'booking' },
   ];

   const Access = Param
      .filter(rules => rules.role === auth.role)
      .filter(rules => rules.target === 'all' || target === rules.target)
      .filter(rules => rules.action === 'manage' || action === rules.action)
      .length > 0;

   return Access;
};


