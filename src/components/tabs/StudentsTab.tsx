import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Plus, Search, Edit, Trash2, AlertCircle } from 'lucide-react';
import { Student } from '../../types/markscam';
import { validateStudentAdmissionNumber } from '../../utils/validators';

export const StudentsTab: React.FC = () => {
  const { students, setStudents, classes, language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClassId, setSelectedClassId] = useState<string>('all');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const [admissionNumber, setAdmissionNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [otherNames, setOtherNames] = useState('');
  const [gender, setGender] = useState<'M' | 'F'>('M');
  const [dateOfBirth, setDateOfBirth] = useState('2014-01-01');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [classId, setClassId] = useState(classes[0]?.id || '');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setAdmissionNumber(`GBHSY/25/0${students.length + 1}`);
    setFirstName('');
    setLastName('');
    setOtherNames('');
    setGender('M');
    setDateOfBirth('2014-01-01');
    setGuardianName('');
    setGuardianPhone('');
    setClassId(classes[0]?.id || '');
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (std: Student) => {
    setEditingStudent(std);
    setAdmissionNumber(std.admission_number);
    setFirstName(std.first_name);
    setLastName(std.last_name);
    setOtherNames(std.other_names || '');
    setGender(std.gender);
    setDateOfBirth(std.date_of_birth);
    setGuardianName(std.guardian_name);
    setGuardianPhone(std.guardian_phone);
    setClassId(std.class_id);
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate uniqueness of admission number
    const validation = validateStudentAdmissionNumber(admissionNumber, students, editingStudent?.id);
    if (!validation.isValid) {
      setErrorMessage(validation.errors[0]);
      return;
    }

    if (editingStudent) {
      setStudents(students.map(s => s.id === editingStudent.id ? {
        ...s,
        admission_number: admissionNumber,
        first_name: firstName,
        last_name: lastName,
        other_names: otherNames,
        gender,
        date_of_birth: dateOfBirth,
        guardian_name: guardianName,
        guardian_phone: guardianPhone,
        class_id: classId,
        updated_at: new Date().toISOString()
      } : s));
    } else {
      const newStudent: Student = {
        id: `std-${Date.now()}`,
        school_id: 'school-gbhs-yaounde',
        class_id: classId,
        admission_number: admissionNumber,
        first_name: firstName,
        last_name: lastName,
        other_names: otherNames,
        gender,
        date_of_birth: dateOfBirth,
        guardian_name: guardianName,
        guardian_phone: guardianPhone,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setStudents([...students, newStudent]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm(language === 'fr' ? 'Supprimer cet élève du registre ?' : 'Delete student from registry?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = `${s.first_name} ${s.last_name} ${s.admission_number}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClassId === 'all' || s.class_id === selectedClassId;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <Users className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Registre des Élèves' : 'Student Registry'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? 'Gestion sécurisée des dossiers élèves avec unicité du numéro d\'immatriculation par école.'
              : 'Secure student records with enforced admission number uniqueness per school.'}
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl accent-green text-white font-bold text-xs shadow-md hover:opacity-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'fr' ? 'Inscrire un Élève' : 'Add Student'}</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-card p-4 rounded-2xl border border-custom shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-secondary" />
          <input
            type="text"
            placeholder={language === 'fr' ? 'Rechercher par nom ou immatriculation...' : 'Search by name or admission number...'}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-secondary border border-custom rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-primary focus:outline-none"
          />
        </div>

        <select
          value={selectedClassId}
          onChange={e => setSelectedClassId(e.target.value)}
          className="w-full sm:w-60 bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-semibold text-primary focus:outline-none cursor-pointer"
        >
          <option value="all">{language === 'fr' ? 'Toutes les Classes' : 'All Classes'}</option>
          {classes.map(c => (
            <option key={c.id} value={c.id}>{language === 'fr' ? c.name_fr : c.name_en}</option>
          ))}
        </select>
      </div>

      {/* Students Table / Grid */}
      <div className="bg-card rounded-2xl border border-custom shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-secondary border-b border-custom text-secondary font-bold uppercase tracking-wider">
                <th className="p-4">{language === 'fr' ? 'Immatriculation' : 'Admission #'}</th>
                <th className="p-4">{language === 'fr' ? 'Nom et Prénom' : 'Full Name'}</th>
                <th className="p-4">{language === 'fr' ? 'Classe' : 'Class'}</th>
                <th className="p-4">{language === 'fr' ? 'Genre' : 'Gender'}</th>
                <th className="p-4">{language === 'fr' ? 'Parent / Tuteur' : 'Guardian'}</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-custom">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-secondary">
                    {language === 'fr' ? 'Aucun élève trouvé.' : 'No students found.'}
                  </td>
                </tr>
              ) : (
                filteredStudents.map(std => {
                  const cls = classes.find(c => c.id === std.class_id);
                  return (
                    <tr key={std.id} className="hover:bg-secondary/50 transition-colors">
                      <td className="p-4 font-mono font-bold text-primary">{std.admission_number}</td>
                      <td className="p-4 font-semibold text-primary">
                        {std.last_name} {std.first_name} {std.other_names || ''}
                      </td>
                      <td className="p-4 text-secondary">{cls ? (language === 'fr' ? cls.name_fr : cls.name_en) : 'N/A'}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${std.gender === 'F' ? 'bg-pink-100 text-pink-800 dark:bg-pink-950/40 dark:text-pink-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300'}`}>
                          {std.gender}
                        </span>
                      </td>
                      <td className="p-4 text-secondary">
                        {std.guardian_name} ({std.guardian_phone})
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(std)}
                          className="p-1.5 rounded-lg bg-secondary text-secondary hover:text-primary cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(std.id)}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 hover:opacity-80 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card w-full max-w-xl rounded-2xl border border-custom p-6 shadow-2xl space-y-6">
            <h3 className="text-lg font-bold text-primary">
              {editingStudent ? (language === 'fr' ? 'Modifier l\'Élève' : 'Edit Student') : (language === 'fr' ? 'Inscrire un Élève' : 'Add New Student')}
            </h3>

            {errorMessage && (
              <div className="flex items-center space-x-2 p-3 rounded-xl bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Admission Number / Immatriculation</label>
                  <input
                    type="text"
                    required
                    value={admissionNumber}
                    onChange={e => setAdmissionNumber(e.target.value)}
                    className="w-full bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-mono font-medium text-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Class / Classe</label>
                  <select
                    value={classId}
                    onChange={e => setClassId(e.target.value)}
                    className="w-full bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-semibold text-primary focus:outline-none cursor-pointer"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{language === 'fr' ? c.name_fr : c.name_en}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">First Name / Prénom</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    className="w-full bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-medium text-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Last Name / Nom</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    className="w-full bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-medium text-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Other Names</label>
                  <input
                    type="text"
                    value={otherNames}
                    onChange={e => setOtherNames(e.target.value)}
                    className="w-full bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-medium text-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Gender / Genre</label>
                  <select
                    value={gender}
                    onChange={e => setGender(e.target.value as 'M' | 'F')}
                    className="w-full bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-semibold text-primary focus:outline-none cursor-pointer"
                  >
                    <option value="M">Male / Masculin</option>
                    <option value="F">Female / Féminin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Date of Birth</label>
                  <input
                    type="date"
                    required
                    value={dateOfBirth}
                    onChange={e => setDateOfBirth(e.target.value)}
                    className="w-full bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-medium text-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Guardian Name / Nom du Tuteur</label>
                  <input
                    type="text"
                    required
                    value={guardianName}
                    onChange={e => setGuardianName(e.target.value)}
                    className="w-full bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-medium text-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Guardian Phone / Téléphone</label>
                  <input
                    type="text"
                    required
                    value={guardianPhone}
                    onChange={e => setGuardianPhone(e.target.value)}
                    className="w-full bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-medium text-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-custom flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-custom bg-secondary text-secondary font-semibold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl accent-green text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
