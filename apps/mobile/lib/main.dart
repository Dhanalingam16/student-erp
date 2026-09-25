import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

void main() {
  runApp(const ProviderScope(child: SchoolERPApp()));
}

final _router = GoRouter(
  initialLocation: '/parent',
  routes: [
    GoRoute(
      path: '/parent',
      builder: (context, state) => const ParentHomeScreen(),
    ),
    GoRoute(
      path: '/student',
      builder: (context, state) => const StudentHomeScreen(),
    ),
  ],
);

class SchoolERPApp extends StatelessWidget {
  const SchoolERPApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Vidya Mandir ERP',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF0F172A),
          primary: const Color(0xFF0F172A),
        ),
        useMaterial3: true,
      ),
      routerConfig: _router,
    );
  }
}

class ParentHomeScreen extends StatelessWidget {
  const ParentHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Vidya Mandir — Parent App'),
        backgroundColor: const Color(0xFF0F172A),
        foregroundColor: Colors.white,
      ),
      body: const Center(
        child: Text('Parent Companion: Multi-child Switcher & Bus GPS active'),
      ),
    );
  }
}

class StudentHomeScreen extends StatelessWidget {
  const StudentHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Vidya Mandir — Student App'),
        backgroundColor: const Color(0xFF0F172A),
        foregroundColor: Colors.white,
      ),
      body: const Center(
        child: Text('Student Companion: Today Timetable & LMS Notes active'),
      ),
    );
  }
}
