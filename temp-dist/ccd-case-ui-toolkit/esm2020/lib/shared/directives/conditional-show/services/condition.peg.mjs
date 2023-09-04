import { generate } from 'pegjs';
const conditionSource = `{
    function flat(arr, depth = 1) {
      var flatten = function (arr, depth = 1) {
        if (depth) return arr;

      // Otherwise, concatenate into the parent array
      return arr.reduce(function (acc, val) {
        return acc.concat(Array.isArray(val) ? flatten(val, depth - 1) : val);
      }, []);

      };

    return flatten(arr, depth - 1);
    }
  }

  Start
    = Formula

  Formula
    = EnclosedFormula
    / OpenFormula

  EnclosedFormula
    = bracket formula:OpenFormula bracket join:(JoinComparator)*
      { return flat([ [formula], join[0] ], 1) }

  OpenFormula
    = eq:OpenEqualityCheck joins:(JoinComparator)*
      { return flat([ eq, flat(joins) ]) }

  JoinComparator
    = comp:Comparator eq:OpenEqualityCheck
      { return [comp, eq]; }
      / CompoundJoinComparator

  CompoundJoinComparator
    = comp:Comparator bracket f:OpenFormula bracket
      { return [comp, f ] }

  OpenEqualityCheck
    = fr:FieldRef _? op:operator _? val:Value
     { return { fieldReference: fr, comparator: op, value: val } }

  Comparator
   = _? c:'AND' _?
   { return c; }
   / _? c:'OR' _?
   { return c; }

  Word
   = l:Letter+
   { return l.join(""); }

  Letter
   = [a-zA-Z]

  Value
   = v:quotedValue / v:Word
   { return v.join("") }
   / v:number
   { return parseInt(v.join("")) }

  FieldRef
   = FieldReference / MetadataFieldReference

  MetadataFieldReference
    = s1:openSquare fr:FieldReference s2:closeSquare
    { return s1 + fr + s2 }

  FieldReference
    = characters:[A-Za-z0-9._-]+ { return characters.join(""); }

  openSquare
   = "["

  closeSquare
   = "]"

  number
   = [0-9]+

  quotedValue
   = '"'val:[A-Za-z0-9.,* _&()/-]*'"'
   { return val.join(""); }

  bracket
   = (_? "("+ _? / _? ")"+ _? )

  operator
   = "=" / "!=" / "CONTAINS"

  ws "Whitespace"
   = [ \t]

  _ "One or more whitespaces"
   = ws+

  nl "New line"
   = "\\n"`;
export default generate(conditionSource);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uLnBlZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvZGlyZWN0aXZlcy9jb25kaXRpb25hbC1zaG93L3NlcnZpY2VzL2NvbmRpdGlvbi5wZWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUVqQyxNQUFNLGVBQWUsR0FDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQW1HUyxDQUFDO0FBRVosZUFBZSxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZW5lcmF0ZSB9IGZyb20gJ3BlZ2pzJztcblxuY29uc3QgY29uZGl0aW9uU291cmNlID1cbiAgYHtcbiAgICBmdW5jdGlvbiBmbGF0KGFyciwgZGVwdGggPSAxKSB7XG4gICAgICB2YXIgZmxhdHRlbiA9IGZ1bmN0aW9uIChhcnIsIGRlcHRoID0gMSkge1xuICAgICAgICBpZiAoZGVwdGgpIHJldHVybiBhcnI7XG5cbiAgICAgIC8vIE90aGVyd2lzZSwgY29uY2F0ZW5hdGUgaW50byB0aGUgcGFyZW50IGFycmF5XG4gICAgICByZXR1cm4gYXJyLnJlZHVjZShmdW5jdGlvbiAoYWNjLCB2YWwpIHtcbiAgICAgICAgcmV0dXJuIGFjYy5jb25jYXQoQXJyYXkuaXNBcnJheSh2YWwpID8gZmxhdHRlbih2YWwsIGRlcHRoIC0gMSkgOiB2YWwpO1xuICAgICAgfSwgW10pO1xuXG4gICAgICB9O1xuXG4gICAgcmV0dXJuIGZsYXR0ZW4oYXJyLCBkZXB0aCAtIDEpO1xuICAgIH1cbiAgfVxuXG4gIFN0YXJ0XG4gICAgPSBGb3JtdWxhXG5cbiAgRm9ybXVsYVxuICAgID0gRW5jbG9zZWRGb3JtdWxhXG4gICAgLyBPcGVuRm9ybXVsYVxuXG4gIEVuY2xvc2VkRm9ybXVsYVxuICAgID0gYnJhY2tldCBmb3JtdWxhOk9wZW5Gb3JtdWxhIGJyYWNrZXQgam9pbjooSm9pbkNvbXBhcmF0b3IpKlxuICAgICAgeyByZXR1cm4gZmxhdChbIFtmb3JtdWxhXSwgam9pblswXSBdLCAxKSB9XG5cbiAgT3BlbkZvcm11bGFcbiAgICA9IGVxOk9wZW5FcXVhbGl0eUNoZWNrIGpvaW5zOihKb2luQ29tcGFyYXRvcikqXG4gICAgICB7IHJldHVybiBmbGF0KFsgZXEsIGZsYXQoam9pbnMpIF0pIH1cblxuICBKb2luQ29tcGFyYXRvclxuICAgID0gY29tcDpDb21wYXJhdG9yIGVxOk9wZW5FcXVhbGl0eUNoZWNrXG4gICAgICB7IHJldHVybiBbY29tcCwgZXFdOyB9XG4gICAgICAvIENvbXBvdW5kSm9pbkNvbXBhcmF0b3JcblxuICBDb21wb3VuZEpvaW5Db21wYXJhdG9yXG4gICAgPSBjb21wOkNvbXBhcmF0b3IgYnJhY2tldCBmOk9wZW5Gb3JtdWxhIGJyYWNrZXRcbiAgICAgIHsgcmV0dXJuIFtjb21wLCBmIF0gfVxuXG4gIE9wZW5FcXVhbGl0eUNoZWNrXG4gICAgPSBmcjpGaWVsZFJlZiBfPyBvcDpvcGVyYXRvciBfPyB2YWw6VmFsdWVcbiAgICAgeyByZXR1cm4geyBmaWVsZFJlZmVyZW5jZTogZnIsIGNvbXBhcmF0b3I6IG9wLCB2YWx1ZTogdmFsIH0gfVxuXG4gIENvbXBhcmF0b3JcbiAgID0gXz8gYzonQU5EJyBfP1xuICAgeyByZXR1cm4gYzsgfVxuICAgLyBfPyBjOidPUicgXz9cbiAgIHsgcmV0dXJuIGM7IH1cblxuICBXb3JkXG4gICA9IGw6TGV0dGVyK1xuICAgeyByZXR1cm4gbC5qb2luKFwiXCIpOyB9XG5cbiAgTGV0dGVyXG4gICA9IFthLXpBLVpdXG5cbiAgVmFsdWVcbiAgID0gdjpxdW90ZWRWYWx1ZSAvIHY6V29yZFxuICAgeyByZXR1cm4gdi5qb2luKFwiXCIpIH1cbiAgIC8gdjpudW1iZXJcbiAgIHsgcmV0dXJuIHBhcnNlSW50KHYuam9pbihcIlwiKSkgfVxuXG4gIEZpZWxkUmVmXG4gICA9IEZpZWxkUmVmZXJlbmNlIC8gTWV0YWRhdGFGaWVsZFJlZmVyZW5jZVxuXG4gIE1ldGFkYXRhRmllbGRSZWZlcmVuY2VcbiAgICA9IHMxOm9wZW5TcXVhcmUgZnI6RmllbGRSZWZlcmVuY2UgczI6Y2xvc2VTcXVhcmVcbiAgICB7IHJldHVybiBzMSArIGZyICsgczIgfVxuXG4gIEZpZWxkUmVmZXJlbmNlXG4gICAgPSBjaGFyYWN0ZXJzOltBLVphLXowLTkuXy1dKyB7IHJldHVybiBjaGFyYWN0ZXJzLmpvaW4oXCJcIik7IH1cblxuICBvcGVuU3F1YXJlXG4gICA9IFwiW1wiXG5cbiAgY2xvc2VTcXVhcmVcbiAgID0gXCJdXCJcblxuICBudW1iZXJcbiAgID0gWzAtOV0rXG5cbiAgcXVvdGVkVmFsdWVcbiAgID0gJ1wiJ3ZhbDpbQS1aYS16MC05LiwqIF8mKCkvLV0qJ1wiJ1xuICAgeyByZXR1cm4gdmFsLmpvaW4oXCJcIik7IH1cblxuICBicmFja2V0XG4gICA9IChfPyBcIihcIisgXz8gLyBfPyBcIilcIisgXz8gKVxuXG4gIG9wZXJhdG9yXG4gICA9IFwiPVwiIC8gXCIhPVwiIC8gXCJDT05UQUlOU1wiXG5cbiAgd3MgXCJXaGl0ZXNwYWNlXCJcbiAgID0gWyBcXHRdXG5cbiAgXyBcIk9uZSBvciBtb3JlIHdoaXRlc3BhY2VzXCJcbiAgID0gd3MrXG5cbiAgbmwgXCJOZXcgbGluZVwiXG4gICA9IFwiXFxcXG5cImA7XG5cbmV4cG9ydCBkZWZhdWx0IGdlbmVyYXRlKGNvbmRpdGlvblNvdXJjZSk7XG4iXX0=