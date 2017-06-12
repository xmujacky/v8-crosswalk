// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax --expose-gc --ignition-staging --no-lazy

function f() {
  for (var i = 0; i < 10; i++) if (i == 5) %OptimizeOsr();
  function g() {}
  %OptimizeFunctionOnNextCall(g);
  g();
}
f();
gc();  // Make sure that ...
gc();  // ... code flushing ...
gc();  // ... clears code ...
gc();  // ... attached to {g}.
f();
