import { useState } from 'react';
import { T } from '../tokens';
import { Icon } from './Icon';
import { PlanLabel, PlanInput, PackingList, CrewRow, PacerRow, EMPTY_PLAN } from './PlanInputs';

export const AidStationDetail = ({ station, stationKey, plans, onPlanChange, isStart, isFinish }) => {
  const [planOpen, setPlanOpen] = useState(false);
  const plan = plans[stationKey] || EMPTY_PLAN;

  const update = (patch) => {
    const updated = { ...plan, ...patch };
    onPlanChange(stationKey, updated);
  };

  const hasPlanning =
    plan.targetArrival ||
    plan.targetDeparture ||
    plan.dropBagItems.length ||
    plan.crew.length ||
    plan.pacers.length ||
    plan.sleepDuration ||
    plan.sleepNotes ||
    plan.leavingHydration ||
    plan.leavingElectrolytes ||
    plan.leavingCalories ||
    (plan.leavingOther || []).length ||
    plan.generalNotes;

  const showDropBag = station.dropBag && !isFinish;
  const showCrew = station.crew;
  const showPacers = station.pacer && !isStart && !isFinish;
  const showSleep = !!station.sleep && !isStart && !isFinish;
  const showLeavingWith = !isFinish;

  const sectionBox = {
    borderRadius: 8,
    padding: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    background: 'rgba(195,170,115,0.4)',
    border: `1px solid ${T.cardBorder}`,
  };

  const subLabel = {
    fontSize: '0.75rem',
    marginBottom: 4,
    color: T.textSecondary,
    fontFamily: "'Inter', sans-serif",
  };

  return (
    <div
      style={{
        background: '#c8ae78',
        borderColor: T.accent + '60',
        borderWidth: 1,
        borderStyle: 'solid',
        borderTopWidth: 0,
        borderRadius: '0 0 8px 8px',
        overflow: 'hidden',
        marginBottom: 4,
      }}
    >
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Gear check warning */}
        {station.gearCheck && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              borderRadius: 8,
              padding: '10px 12px',
              background: T.redDark,
              border: `1px solid ${T.red}60`,
            }}
          >
            <span style={{ color: T.red, marginTop: 2, flexShrink: 0 }}>
              <Icon name="alert" size={14} />
            </span>
            <p style={{ fontSize: '0.875rem', color: T.textPrimary, margin: 0, fontFamily: "'Inter', sans-serif" }}>
              <span style={{ fontWeight: 700 }}>Gear Check: </span>
              {station.gearCheck} — Required gear will be verified before you leave this station.
            </p>
          </div>
        )}

        {/* Pacer restriction note */}
        {station.pacerNote && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              borderRadius: 8,
              padding: '10px 12px',
              background: T.orangeDark,
              border: `1px solid ${T.orange}60`,
            }}
          >
            <span style={{ color: T.orange, marginTop: 2, flexShrink: 0 }}>
              <Icon name="alert" size={14} />
            </span>
            <p
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: T.textPrimary,
                margin: 0,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {station.pacerNote} at this aid station
            </p>
          </div>
        )}

        {/* Amenity grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 8,
          }}
        >
          {[
            { label: 'Crew Access', val: station.crew, icon: 'crew', col: T.sky },
            { label: 'Pacer Access', val: station.pacer, icon: 'pacer', col: T.violet },
            { label: 'Drop Bag', val: station.dropBag, icon: 'bag', col: T.sandy },
            { label: 'Medic', val: station.medic, icon: 'medic', col: T.red },
          ].map(({ label, val, icon, col }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                borderRadius: 8,
                padding: '8px 10px',
                background: val ? 'rgba(200,175,120,0.7)' : 'rgba(185,160,105,0.35)',
                border: `1px solid ${val ? T.cardBorder : 'rgba(140,95,45,0.2)'}`,
              }}
            >
              <span style={{ color: val ? col : T.textMuted }}>
                <Icon name={icon} size={13} />
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: val ? T.textPrimary : T.textMuted,
                  textDecoration: val ? 'none' : 'line-through',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {label}
              </span>
              <span style={{ color: val ? T.green : T.textMuted, marginLeft: 'auto', flexShrink: 0 }}>
                <Icon name={val ? 'check' : 'xmark'} size={11} />
              </span>
            </div>
          ))}
        </div>

        {/* Sleep / Shower badges */}
        {(station.sleep || station.shower) && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {station.sleep && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  borderRadius: 8,
                  padding: '6px 10px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                  background: station.sleep === 'Indoor' ? T.greenDark : T.orangeDark,
                  color: station.sleep === 'Indoor' ? T.green : T.orange,
                  border: `1px solid ${station.sleep === 'Indoor' ? T.green : T.orange}50`,
                }}
              >
                <Icon name="sleep" size={13} />
                {station.sleep} Sleep Station
              </div>
            )}
            {station.shower && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  borderRadius: 8,
                  padding: '6px 10px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                  background: T.tealDark,
                  color: T.teal,
                  border: `1px solid ${T.teal}50`,
                }}
              >
                <Icon name="shower" size={13} />
                Showers Available
              </div>
            )}
          </div>
        )}

        {/* Food info */}
        {station.food && (
          <div
            style={{
              borderRadius: 8,
              padding: 12,
              background: 'rgba(200,175,120,0.7)',
              border: `1px solid ${T.accent}40`,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: 8,
                color: T.accentLight,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <Icon name="food" size={12} />
              <span>Food</span>
            </div>
            <p
              style={{
                fontSize: '0.875rem',
                lineHeight: 1.6,
                color: T.textPrimary,
                margin: 0,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {station.food}
            </p>
            <p
              style={{
                fontSize: '0.75rem',
                marginTop: 8,
                fontStyle: 'italic',
                color: T.textMuted,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              + traditional offerings: PB&amp;J, pretzels, chips, bananas, Coke, Tailwind, broth, ramen, oatmeal
            </p>
          </div>
        )}

        {/* My Plan toggle */}
        <div style={{ borderTop: `1px solid ${T.cardBorder}`, paddingTop: 12 }}>
          <button
            onClick={() => setPlanOpen((o) => !o)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: 8,
              padding: '10px 12px',
              fontFamily: "'Inter', sans-serif",
              transition: 'all 0.15s',
              background: planOpen ? 'rgba(176,58,16,0.12)' : 'rgba(176,58,16,0.07)',
              border: `1px solid ${T.accent}50`,
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: T.accent, fontSize: '1rem' }}>&#9998;</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: T.accent }}>My Plan</span>
              {hasPlanning && !planOpen && (
                <span
                  style={{
                    fontSize: '0.75rem',
                    padding: '2px 6px',
                    borderRadius: 9999,
                    fontWeight: 600,
                    background: T.accent,
                    color: '#f5efe0',
                  }}
                >
                  saved
                </span>
              )}
            </div>
            <span
              style={{
                color: T.accent,
                transform: planOpen ? 'rotate(90deg)' : 'none',
                transition: 'transform 0.2s',
                display: 'inline-flex',
              }}
            >
              <Icon name="chevron" size={13} />
            </span>
          </button>

          {planOpen && (
            <div
              style={{
                marginTop: 12,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {/* Target Time */}
              <div style={sectionBox}>
                <PlanLabel>{'\u{1F550}'} Target Time</PlanLabel>

                {isStart ? (
                  <div>
                    <div style={subLabel}>Race start time</div>
                    <div
                      style={{
                        borderRadius: 8,
                        padding: '8px 10px',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        fontFamily: "'Inter', sans-serif",
                        background: 'rgba(235,215,170,0.5)',
                        border: `1px solid ${T.cardBorder}`,
                        color: T.green,
                      }}
                    >
                      Mon May 4 &middot; 5:00 AM — Mass start
                    </div>
                    <div style={{ ...subLabel, marginTop: 8 }}>Pre-race notes</div>
                    <PlanInput
                      value={plan.timeNotes}
                      onChange={(v) => update({ timeNotes: v })}
                      placeholder="e.g. Arrive by 4:00 AM for gear check, pick up SPOT tracker"
                    />
                  </div>
                ) : isFinish ? (
                  <div>
                    <div style={subLabel}>Goal finish time</div>
                    <PlanInput
                      value={plan.targetArrival}
                      onChange={(v) => update({ targetArrival: v })}
                      placeholder="e.g. Fri 6:00 PM (cutoff Sat 10:00 AM)"
                    />
                    <div style={{ ...subLabel, marginTop: 8 }}>Time notes</div>
                    <PlanInput
                      value={plan.timeNotes}
                      onChange={(v) => update({ timeNotes: v })}
                      placeholder="e.g. Aiming for sub-100 hrs, leave buffer from Trinity Heights"
                    />
                  </div>
                ) : (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <div style={subLabel}>Target arrival</div>
                        <PlanInput
                          value={plan.targetArrival}
                          onChange={(v) => update({ targetArrival: v })}
                          placeholder="e.g. Wed 10:30 AM"
                        />
                      </div>
                      <div>
                        <div style={subLabel}>Target departure</div>
                        <PlanInput
                          value={plan.targetDeparture}
                          onChange={(v) => update({ targetDeparture: v })}
                          placeholder="e.g. Wed 11:00 AM"
                        />
                      </div>
                    </div>
                    <div>
                      <div style={subLabel}>Time notes / buffer</div>
                      <PlanInput
                        value={plan.timeNotes}
                        onChange={(v) => update({ timeNotes: v })}
                        placeholder="e.g. Allow 30 min, cutoff is Wed 1:00 PM"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Drop Bag */}
              {showDropBag && (
                <div style={sectionBox}>
                  <PlanLabel color={T.sandy}>{'\u{1F392}'} Drop Bag Contents</PlanLabel>
                  <PackingList items={plan.dropBagItems} onChange={(v) => update({ dropBagItems: v })} />
                </div>
              )}

              {/* Crew */}
              {showCrew && (
                <div style={sectionBox}>
                  <PlanLabel color={T.sky}>
                    {'\u{1F465}'} {isFinish ? 'Crew / People Meeting You' : 'Crew'}
                  </PlanLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {plan.crew.map((person, i) => (
                      <CrewRow
                        key={i}
                        person={person}
                        onChange={(p) => {
                          const c = [...plan.crew];
                          c[i] = p;
                          update({ crew: c });
                        }}
                        onRemove={() => update({ crew: plan.crew.filter((_, j) => j !== i) })}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => update({ crew: [...plan.crew, { name: '', role: 'Both', vehicle: '' }] })}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: 8,
                      background: T.sky + '20',
                      border: `1px dashed ${T.sky}60`,
                      color: T.sky,
                      cursor: 'pointer',
                      alignSelf: 'flex-start',
                    }}
                  >
                    + Add crew member
                  </button>
                </div>
              )}

              {/* Pacers */}
              {showPacers && (
                <div style={sectionBox}>
                  <PlanLabel color={T.violet}>{'\u{1F3C3}'} Pacers</PlanLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {plan.pacers.map((pacer, i) => (
                      <PacerRow
                        key={i}
                        pacer={pacer}
                        onChange={(p) => {
                          const ps = [...plan.pacers];
                          ps[i] = p;
                          update({ pacers: ps });
                        }}
                        onRemove={() => update({ pacers: plan.pacers.filter((_, j) => j !== i) })}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      update({
                        pacers: [...plan.pacers, { name: '', action: 'Joining here', runningTo: '' }],
                      })
                    }
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: 8,
                      background: T.violet + '20',
                      border: `1px dashed ${T.violet}60`,
                      color: T.violet,
                      cursor: 'pointer',
                      alignSelf: 'flex-start',
                    }}
                  >
                    + Add pacer
                  </button>
                </div>
              )}

              {/* Sleep */}
              {showSleep && (
                <div style={sectionBox}>
                  <PlanLabel color={T.green}>{'\u{1F634}'} Sleep Strategy</PlanLabel>
                  <div>
                    <div style={subLabel}>Planned sleep duration</div>
                    <PlanInput
                      value={plan.sleepDuration}
                      onChange={(v) => update({ sleepDuration: v })}
                      placeholder="e.g. 20 min nap, or skip"
                    />
                  </div>
                  <div>
                    <div style={subLabel}>Sleep notes / routine</div>
                    <PlanInput
                      value={plan.sleepNotes}
                      onChange={(v) => update({ sleepNotes: v })}
                      placeholder="e.g. Ask for wake-up call, bring ear plugs, lay flat before continuing"
                      multiline
                      rows={2}
                    />
                  </div>
                </div>
              )}

              {/* Leaving With */}
              {showLeavingWith && (
                <div style={sectionBox}>
                  <PlanLabel color={T.teal}>{'\u{1F3BD}'} Leaving With</PlanLabel>
                  <p
                    style={{
                      fontSize: '0.75rem',
                      fontStyle: 'italic',
                      marginTop: -4,
                      color: T.textMuted,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {isStart
                      ? "What you're carrying from the start line."
                      : "Plan what you'll carry out of this station to the next."}
                  </p>

                  {/* Hydration */}
                  <div
                    style={{
                      borderRadius: 8,
                      padding: 10,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                      background: 'rgba(26,96,96,0.10)',
                      border: `1px solid ${T.teal}40`,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: T.teal,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {'\u{1F4A7}'} Hydration
                    </div>
                    <PlanInput
                      value={plan.leavingHydration}
                      onChange={(v) => update({ leavingHydration: v })}
                      placeholder="e.g. 2\u00d7 500 ml flasks + 1 L bladder (total 2 L)"
                    />
                  </div>

                  {/* Electrolytes */}
                  <div
                    style={{
                      borderRadius: 8,
                      padding: 10,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                      background: 'rgba(122,80,16,0.10)',
                      border: `1px solid ${T.sandy}40`,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: T.sandy,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {'\u{1F9C2}'} Electrolytes
                    </div>
                    <PlanInput
                      value={plan.leavingElectrolytes}
                      onChange={(v) => update({ leavingElectrolytes: v })}
                      placeholder="e.g. 4\u00d7 SaltStick caps, 1\u00d7 Tailwind sachet, 1\u00d7 LMNT stick"
                    />
                  </div>

                  {/* Calories */}
                  <div
                    style={{
                      borderRadius: 8,
                      padding: 10,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                      background: 'rgba(154,26,8,0.09)',
                      border: `1px solid ${T.red}35`,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: T.red,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {'\u{1F525}'} Calories
                    </div>
                    <PlanInput
                      value={plan.leavingCalories}
                      onChange={(v) => update({ leavingCalories: v })}
                      placeholder="e.g. 4\u00d7 gels, 2\u00d7 bars, 1 bag chews (~800 kcal)"
                    />
                  </div>

                  {/* Other gear */}
                  <div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        marginBottom: 6,
                        color: T.textSecondary,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Other items
                    </div>
                    <PackingList items={plan.leavingOther || []} onChange={(v) => update({ leavingOther: v })} />
                  </div>
                </div>
              )}

              {/* General Notes */}
              <div style={sectionBox}>
                <PlanLabel>{'\u{1F4DD}'} Notes</PlanLabel>
                <PlanInput
                  value={plan.generalNotes}
                  onChange={(v) => update({ generalNotes: v })}
                  placeholder="Any other notes for this station \u2014 gear swaps, medical checks, food priorities, mental cues\u2026"
                  multiline
                  rows={3}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
